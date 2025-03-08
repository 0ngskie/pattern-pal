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

        const users = results.map(user => new User(
            user.user_id,
            user.first_name, 
            user.last_name,
            user.username, 
            user.email, 
            user.password,
            user.account_role, 
            user.user_credit
        ));

        res.json(users);
    });
};

//createUser
module.exports.createUser = (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;

    //Check if Email or Username is already taken
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    const checkValues = [email, username];

    mysqlConnection.query(checkQuery, checkValues, (error, checkResult) => {

        if (error) {

            console.error("Error checking user:", error);
            return res.status(500).json({ error: "Error checking user" });

        }

        if (checkResult.length > 0) {

            return res.status(400).json({ error: "Email or username already taken" });

        } else {
            
            const insertQuery = "INSERT INTO users (first_name, last_name, email, username, password, account_role, user_credit) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const insertValues = [first_name, last_name, email, username, password, "user", 0];

            mysqlConnection.query(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating user:', insertError);
                    return res.status(500).json({ error: 'Error creating user' });
                }

                res.status(201).json(insertResult);

            })
        }
    })
}

//loginUser
module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [email, password];

    mysqlConnection.query(query, values, (error, result) => {

        if (error) {
            console.error("Error logging in user:", error);
            return res.status(500).json({ error: "Error logging in user" });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.json(result);
    });
}