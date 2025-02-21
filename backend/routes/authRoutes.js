const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO profile (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already registered" });
        }
        return res.status(500).json({ message: "Error saving user", error: err });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM profile WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful!", token });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  });
});

module.exports = router;
