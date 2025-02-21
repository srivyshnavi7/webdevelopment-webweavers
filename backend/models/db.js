const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // Change this
  password: "root",   // Change this
  database: "webdevelopment",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Database connected successfully!");
});

module.exports = connection;