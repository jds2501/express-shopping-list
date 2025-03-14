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
});