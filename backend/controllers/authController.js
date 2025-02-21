const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    userModel.createUser(username, email, password, (err, result) => {
        if (err) return res.status(500).json({ message: "Error registering user", error: err });
        res.status(201).json({ message: "User registered successfully!" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    userModel.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];
        const isMatch = require('bcryptjs').compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    });
};
