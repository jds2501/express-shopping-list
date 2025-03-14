const itemsModel = require('../items-model.js');

describe('Items Model', () => {
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

    it('missing name and/or price should throw an error', () => {
        expect(() => itemsModel.addItem()).toThrow("A string name needs to be included");
        expect(() => itemsModel.addItem("test")).toThrow("A numerical price needs to be included");
    })
});