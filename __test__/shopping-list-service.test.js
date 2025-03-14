const request = require('supertest');

describe('Shopping List Service API Tests', () => {
    let server;

    beforeEach(() => {
        const createServer = require('../shopping-list-service.js');
        const app = createServer();
        server = app.listen();
    });

    afterEach((done) => {
        server.close(done);
    });

    test('GET request on /items with no items', (done) => {
        request(server)
            .get("/items")
            .expect(200, [], done);
    })
});