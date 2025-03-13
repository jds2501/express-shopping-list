const express = require('express');
const shoppingListRouter = require('./items.js');

const app = express();

app.use('/items', shoppingListRouter);

app.listen(3000, () => {
    console.log("Running on port 3000");
});