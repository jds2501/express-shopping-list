const request = require('supertest');
const itemsModel = require('../items-model.js');

describe('Shopping List Service API Tests', () => {
    let server;

    beforeEach(() => {
        const createServer = require('../shopping-list-service.js');
        const app = createServer();
        server = app.listen();
    });

    afterEach(() => {
        itemsModel.deleteAll();
        server.close();
    });

    test('GET request on /items with no items', async () => {
        await request(server)
            .get("/items")
            .expect(200, []);
    });

    test('GET request to non-supported URL throws 404', async () => {
        await request(server)
            .get("/dne")
            .expect(404, { error: "URL not found" });
    });

    test('POST and GET request on items', async () => {
        const postResponse = await request(server)
            .post('/items')
            .send({ name: "test", price: 2.3 })
            .expect(200);

        expect(postResponse.body.added).toStrictEqual({ name: "test", price: 2.3 });

        await request(server)
            .get("/items")
            .expect(200, [{ name: "test", price: 2.3 }]);

        await request(server)
            .get("/items/test")
            .expect(200, { name: "test", price: 2.3 });
    });

    test('POST, PATCH, and GET request on an item', async () => {
        await request(server)
            .post('/items')
            .send({ name: "test", price: 2.3 })
            .expect(200);


        const patchResponse = await request(server)
            .patch('/items/test')
            .send({ name: "updated", price: 3.7 })
            .expect(200);

        expect(patchResponse.body.updated).toStrictEqual({ name: "updated", price: 3.7 });

        await request(server)
            .get("/items/updated")
            .expect(200, { name: "updated", price: 3.7 });
    });
});