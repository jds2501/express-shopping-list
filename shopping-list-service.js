const express = require('express');
const items = require('./items-router.js');

function createServer() {
    const app = express();

    app.use(express.json());
    app.use('/items', items);

    // Handles accessing a non-matching path
    app.use((req, res) => {
        return res.status(404).send({
            error: "URL not found"
        });
    });

    // Handles exceptions
    app.use((err, req, res, next) => {
        return res.status(err.statusCode || 500).send({
            error: err.message || "Internal server error"
        });
    });

    return app;
}

module.exports = createServer;