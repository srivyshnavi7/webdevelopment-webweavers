const express = require('express');
const { buyTicket, verifyTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/buy-ticket', buyTicket);
router.get('/verify-ticket/:ticketNumber', verifyTicket);

module.exports = router;
