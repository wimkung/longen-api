const hapi = require('hapi');
const db = require('./database');
const route = require('./routes');

const server = hapi.server({
    host: 'localhost',
    port: 8000,
});

server.route(route);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();