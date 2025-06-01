
const express = require('express');
const router = express.Router(); 
const { pairMentorMentee, getPairings } = require('../controllers/pairingController');

router.post('/pair', pairMentorMentee);
router.get('/pairs', getPairings);

module.exports = router;
