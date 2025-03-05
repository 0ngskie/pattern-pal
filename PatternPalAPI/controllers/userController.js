const User = require("../models/user");
const mysqlConnection = require("../mysql/mysqlConnection");
const bcrypt = require('bcrypt');

//Basic CRUD

//Get All Users
module.exports.getAllUsers = (req, res) => {

    const query = "SELECT * FROM users";
    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Error fetching users" });
        }

        // Map results to User class objects
        const users = results.map(user => new User(
            user.user_id, user.first_name, user.last_name,
            user.username, user.email, user.password,
            user.account_role, user.user_credit
        ));

        res.json(users);
    });
};

module.exports.getSpecificUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    mysqlConnection.query(query, [email], async (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        // Compare hashed password with the entered password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", user });
    });
};

module.exports.createUser = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;

    if (!email || !password || !first_name || !last_name || !username || !email || !password) {
        return res.status(400).json({ error: "Please fill in all required fields" });
    }

    try {
        // Hash the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = "INSERT INTO users (first_name, last_name, username, email, password, account_role, user_credit) VALUES (?, ?, ?, ?, ?)";
        mysqlConnection.query(query, [first_name, last_name, username, email, hashedPassword], 
            (error, results) => {
                if (error) {
                    console.error("Error inserting user:", error);
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.status(201).json({ message: "User registered successfully" });
            }
        );
    } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ error: "Error processing request" });
    }
};