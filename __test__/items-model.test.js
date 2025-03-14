const itemsModel = require('../items-model.js');

describe('Items Model', () => {
    afterEach(() => {
        itemsModel.deleteAll();
    });

    it('get items return empty DB on initialization', () => {
        expect(itemsModel.getItems()).toStrictEqual([]);
    });

    it('get item throws error on invalid input', () => {
        expect(() => itemsModel.getItem()).toThrow("A string name needs to be included");
    });

    it('get item throws error on item that does not exist', () => {
        expect(() => itemsModel.getItem("dne")).toThrow("dne not found in DB");
    });

    it('adding an item should be possible to get from get items and get item', () => {
        itemsModel.addItem("test", 2.3);
        expect(itemsModel.getItems()[0]).toStrictEqual({ name: "test", price: 2.3 });
        expect(itemsModel.getItem("test")).toStrictEqual({ name: "test", price: 2.3 });
    });

    it('adding two items should have 2 items and enable requesting a specific item', () => {
        itemsModel.addItem("first", 2.3);
        itemsModel.addItem("second", 4.8);
        expect(itemsModel.getItems().length).toBe(2);
        expect(itemsModel.getItem("first")).toStrictEqual({ name: "first", price: 2.3 });
    });

    it('missing name and/or price should throw an error', () => {
        expect(() => itemsModel.addItem()).toThrow("A string name needs to be included");
        expect(() => itemsModel.addItem("test")).toThrow("A numerical price needs to be included");
    });

    it('update item should throw errors with missing parameters', () => {
        expect(() => itemsModel.updateItem()).toThrow("A string name needs to be included");
        expect(() => itemsModel.updateItem("test")).toThrow("A string name needs to be included");
        expect(() => itemsModel.updateItem("test", "update")).toThrow("A numerical price needs to be included");
    });

    it('adding & updating an item should show the update on retrieval', () => {
        itemsModel.addItem("first", 2.3);
        itemsModel.updateItem("first", "diff", 3.7);
        expect(itemsModel.getItem("diff")).toStrictEqual({ name: "diff", price: 3.7 });
    });

    it('missing name should throw an error on delete', () => {
        expect(() => itemsModel.deleteItem()).toThrow("A string name needs to be included");
    })
});