'use strict'
require('dotenv').config();
const fs = require('fs');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiGood = require('good');
const HapiMongoose = require('hapi-mongoose');
const HapiSwagger = require('hapi-swagger');

const routes = require('./api/routes');
const db = require('./api/db');

const PORT = process.env.PORT || '8000';
const HOST = process.env.HOST || 'localhost';
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// const USERNAME = process.env.USERNAME;
// const PASSWORD = process.env.PASSWORD;
// const DB_CONNECTION = process.env.MONGODB_URI;

const server = new Hapi.Server();
server.connection({
    port: PORT
});

let options = {
    info: {
        'title': 'Tasks API Documentation',
        'version': '0.0.1'
    }
};
let goodOptions = {
  ops: {
        interval: 1000
    },
    reporters: {
        myReporter: [{
            module: 'good-console',
            args: [{ error: '*' }]
        }]
    }
}

let mongooseOption  = {
    bluebird: false,
    uri: MONGOURL
};

server.register([
    Inert,
    Vision,
    {
        register: HapiMongoose,
        options: mongooseOption
    },
    {
        register: HapiGood,
        options: goodOptions
    },
    {
        register: HapiSwagger,
        options: options
    }], err => {
        if (err) throw err;

        for (var route in routes) {
            server.route(routes[route]);
        }

        // server.route(routes[0]);
        // server.route(routes[1]);

        server.start(() => console.log(`Started at: ${server.info.uri}`));

});

