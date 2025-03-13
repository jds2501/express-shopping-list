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

router.patch('/:name', (req, res) => {
    itemsModel.updateItem(req.params.name, req.body.name, req.body.price);
    return res.json({ "updated": { name: req.body.name, price: req.body.price } });
})

router.delete('/:name', (req, res) => {
    itemsModel.deleteItem(req.params.name);
    return res.json({ "message": "Deleted" });
});

module.exports = router;