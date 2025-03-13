const express = require('express');
const items = require('./items-router.js');

const app = express();

app.use(express.json());
app.use('/items', items);
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        error: err.message || "Internal server error"
    });
    next();
});

app.listen(3000, () => {
    console.log("Running on port 3000");
});