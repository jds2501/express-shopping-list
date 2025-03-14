const db = require('./fakeDB.js');

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

function validateName(name) {
    if (!name || typeof name !== "string") {
        throw new BadRequestError("A string name needs to be included");
    }
}

function validatePrice(price) {
    if (!price || isNaN(price)) {
        throw new BadRequestError("A numerical price needs to be included");
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
        throw new BadRequestError(`${name} not found in DB`);
    }
}

function addItem(name, price) {
    validateName(name);
    validatePrice(price);

    if (db.filter((item) => item.name === name).length === 0) {
        db.push({ name, price });
    } else {
        throw new BadRequestError("Duplicate item being added");
    }
}

function updateItem(findName, newName, newPrice) {
    validateName(findName);
    validateName(newName);
    validatePrice(newPrice);

    const index = db.findIndex((item) => item.name === findName);
    if (index === -1) {
        throw new BadRequestError(`${findName} not found`);
    } else {
        db.splice(index, 1, { name: newName, price: newPrice });
    }
}

function deleteItem(name) {
    validateName(name);

    const index = db.findIndex((item) => item.name === name);
    if (index === -1) {
        throw new BadRequestError(`${name} not found`);
    } else {
        db.splice(index, 1);
    }
}

function deleteAll() {
    db.splice(0, db.length);
}

module.exports = { getItems, getItem, addItem, updateItem, deleteItem, deleteAll };