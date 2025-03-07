const User = require("../models/user");
const mysqlConnection = require("../mysql/mysqlConnection");

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

module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    mysqlConnection.query(query, [email], (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];
        
        // Directly return the user without password validation
        return res.status(200).json({ message: "User found", user });
    });
};

module.exports.createAccount = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
  
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
  
    const query = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
    mysqlConnection.query(query, [firstName, lastName, email, password], (error, res) => {
      if (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      return res.status(201).json({ message: "User created successfully" });
    });
  };
