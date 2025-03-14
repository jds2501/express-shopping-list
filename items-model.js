const db = require('./fakeDB.js');

class HTTPError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

function validateName(name) {
    if (!name || typeof name !== "string") {
        throw new HTTPError("A string name needs to be included", 400);
    }
}

function validatePrice(price) {
    if (!price || isNaN(price)) {
        throw new HTTPError("A numerical price needs to be included", 400);
    }
}

function getItems() {
    return db;
}

function getItem(name) {
    validateName(name);

    const filterItem = db.filter((item) => {
        return item.name === name;
    });

    if (filterItem.length === 1) {
        return filterItem[0];
    } else {
        throw new HTTPError(`${name} not found in DB`, 404);
    }
}

function addItem(name, price) {
    validateName(name);
    validatePrice(price);

    if (db.filter((item) => item.name === name).length === 0) {
        db.push({ name, price });
    } else {
        throw new HTTPError("Duplicate item being added", 404);
    }
}

function updateItem(findName, newName, newPrice) {
    validateName(findName);
    validateName(newName);
    validatePrice(newPrice);

    const index = db.findIndex((item) => item.name === findName);
    if (index === -1) {
        throw new HTTPError(`${findName} not found`, 404);
    } else {
        db.splice(index, 1, { name: newName, price: newPrice });
    }
}

function deleteItem(name) {
    validateName(name);

    const index = db.findIndex((item) => item.name === name);
    if (index === -1) {
        throw new HTTPError(`${name} not found`, 404);
    } else {
        db.splice(index, 1);
    }
}

function deleteAll() {
    db.splice(0, db.length);
}

module.exports = { getItems, getItem, addItem, updateItem, deleteItem, deleteAll };