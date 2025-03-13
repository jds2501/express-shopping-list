const express = require('express');
const db = require('./fakeDB.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(db);
})

module.exports = router;