const express = require('express');
const items = require('./items-router.js');

const app = express();

app.use(express.json());
app.use('/items', items);

// Handles accessing a non-matching path
app.use((req, res) => {
    return res.status(400).send({
        error: "URL not found"
    });
});

// Handles exceptions
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).send({
        error: err.message || "Internal server error"
    });
});

app.listen(3000, () => {
    console.log("Running on port 3000");
});