const express = require('express');
const itemsModel = require('./items-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json(itemsModel.getItems());
});

router.post('/', (req, res) => {
    try {
        itemsModel.addItem(req.body.name, req.body.price);
        return res.json({ "added": { name: req.body.name, price: req.body.price } });
    } catch (err) {
        res.status = 400;
        return res.json({ "error": err.toString() });
    }
})

module.exports = router;