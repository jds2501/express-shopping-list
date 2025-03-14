const createServer = require('./shopping-list-service.js');

const app = createServer();

app.listen(3000, () => {
    console.log("Running on port 3000");
});