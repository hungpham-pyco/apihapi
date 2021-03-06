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


const PORT = process.env.PORT || '8000';
const HOST = process.env.HOST || 'localhost';
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// const USERNAME = process.env.USERNAME;
// const PASSWORD = process.env.PASSWORD;
// const DB_CONNECTION = process.env.MONGODB_URI;

const server = new Hapi.Server();
server.connection({
    port: PORT,
    host: HOST
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

        server.route({
            method: 'GET',
            path: '/favicon.ico',
            config: {
                auth: false,
                cache: {
                    expiresIn: 1000*60*60*24*21
                }
            },
            handler: function(request, reply) {
                reply(null, fs.createReadStream('./public/favicon.png')).code(200).type('image/x-icon');
            }
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => {

                let db = server.plugins['hapi-mongoose'].connection;

                let mongoose = server.plugins['hapi-mongoose'].lib;

                var Schema = mongoose.Schema;

                var tankSchema = new Schema({
                 size: {
                     type: String
                 }
                });

                var Tank = db.model('Tank', tankSchema);

                var small = new Tank({ size: 'small' });

                small.save(function (err) {
                if (err) throw (err);
                console.log('saved to mLab!');
                })
                reply('hello hapi');
            }
        });

        server.route({
            method: 'GET',
            path: '/tasks',
            config: {
                handler: (request, reply) => {
                    reply(`hello ${request.params.name}`);
                },
                description: 'Get tasks list',
                notes: 'Returns the tasks list',
                tags: ['api']
            }
        })

        server.route({
            method: 'GET',
            path: '/task/{id}/',
            config: {
                handler: (request, reply) => {
                    reply(`hello ${request.params.name}`);
                },
                description: 'Get task',
                notes: 'Returns a task item by the id passed in the path',
                tags: ['api']
            }
        });

        server.route({
            method: 'POST',
            path: '/task/',
            config: {
                handler: (request, reply) => {
                    reply(`hello ${request.params.name}`);
                },
                description: 'create new task',
                notes: 'Returns a task item id',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.number()
                            .required()
                            .description('the id for the task item'),
                        name: Joi.string()
                            .required()
                            .description('the name for the task item')
                    }
                }
            }
        });

        server.route({
            method: 'PUT',
            path: '/task/{id}/',
            config: {
                handler: (request, reply) => {
                    reply(`hello ${request.params.name}`);
                },
                description: 'update exist task',
                notes: 'Returns a task item id',
                tags: ['api'],
                validate: {
                    params: {
                        name: Joi.string()
                            .required()
                            .description('the name for the task item')
                    }
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/task/{id}/',
            config: {
                handler: (request, reply) => {
                    reply(`hello ${request.params.name}`);
                },
                description: 'delete exist task',
                notes: 'Return nothing',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.number()
                            .required()
                            .description('the id for the task item')
                    }
                }
            }
        });

        server.start(() => console.log(`Started at: ${server.info.uri}`));

});

