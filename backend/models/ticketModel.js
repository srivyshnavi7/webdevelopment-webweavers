const db = require('./db');

exports.createTicket = (userId, eventName, ticketNumber, callback) => {
    db.query(
        "INSERT INTO tickets (ticket_number, user_id, event_name) VALUES (?, ?, ?)", 
        [ticketNumber, userId, eventName], 
        callback
    );
};

exports.verifyTicket = (ticketNumber, callback) => {
    db.query(
        "SELECT * FROM tickets WHERE ticket_number = ? AND is_valid = TRUE", 
        [ticketNumber], 
        callback
    );
};
