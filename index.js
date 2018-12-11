const hapi = require('hapi');
const route = require('./routes');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const Pack = require('./package');

require('./database');

const server = hapi.server({
  host: 'localhost',
  port: 8000
});

// Start the server
async function start() {
  const swaggerOptions = {
    info: {
      title: 'Longen API Documentation',
      version: Pack.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route(route);

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
}

start();
