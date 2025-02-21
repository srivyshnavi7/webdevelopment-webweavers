const ticketModel = require('../models/ticketModel');

exports.buyTicket = (req, res) => {
    const { userId, eventName } = req.body;
    const ticketNumber = Math.floor(10000 + Math.random() * 90000).toString();

    ticketModel.createTicket(userId, eventName, ticketNumber, (err, result) => {
        if (err) return res.status(500).json({ message: "Error generating ticket" });
        res.status(201).json({ message: "Ticket purchased successfully!", ticketNumber });
    });
};

exports.verifyTicket = (req, res) => {
    const { ticketNumber } = req.params;

    ticketModel.verifyTicket(ticketNumber, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length === 0) {
            return res.json({ isValid: false, message: "Invalid or expired ticket" });
        }

        res.json({ isValid: true, message: "Ticket is valid!" });
    });
};
