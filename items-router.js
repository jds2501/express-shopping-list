const express = require('express');
const itemsModel = require('./items-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json(itemsModel.getItems());
});

module.exports = router;