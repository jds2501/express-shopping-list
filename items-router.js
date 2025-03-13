const express = require('express');
const itemsModel = require('./items-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json(itemsModel.getItems());
});

router.post('/', (req, res) => {
    itemsModel.addItem(req.body.name, req.body.price);
    return res.json({ "added": { name: req.body.name, price: req.body.price } });
});

router.get('/:name', (req, res) => {
    const item = itemsModel.getItem(req.params.name);
    return res.json(item);
});

module.exports = router;