'use strict'
require('dotenv').config();
const fs = require('fs');
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Joi = require('joi')
const HapiSwagger = require('hapi-swagger')


const PORT = process.env.PORT || '8000';
const HOST = process.env.HOST || 'localhost';

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

server.register([
    Inert,
    Vision,
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
                console.log(request);
                reply(null, fs.createReadStream('./public/favicon.png')).code(200).type('image/x-icon');
            }
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                server.log('error', 'Oh no!');
                server.log('info', 'replying');
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
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number()
                            .required()
                            .description('the id for the task item')
                    }
                }
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
