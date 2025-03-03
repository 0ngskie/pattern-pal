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