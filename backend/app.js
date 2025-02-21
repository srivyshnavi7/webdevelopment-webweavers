require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Frontend (Optional)
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api", require("./routes/auth"));  // ✅ Route handling

// Default Route
app.get("/", (req, res) => {
    res.send("Event Ticketing System Backend Running ✅");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
