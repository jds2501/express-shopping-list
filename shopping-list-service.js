const express = require('express');
const items = require('./items.js');

const app = express();

app.use('/items', items);

app.listen(3000, () => {
    console.log("Running on port 3000");
});