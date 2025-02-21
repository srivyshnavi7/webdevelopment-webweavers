const db = require('./db');
const bcrypt = require('bcryptjs');

exports.createUser = (username, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        callback
    );
};

exports.findUserByEmail = (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};
