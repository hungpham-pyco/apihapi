'use strict'
const Hapi = require('hapi')
const Boom = require('boom')

const server = new Hapi.Server()
server.connection({ port: 8800 })

function handlerStuff(request, reply) {
    var error = Boom.create(500, 'Server error', {
        timestamp: 'datetime',
        errorCode: 500123
    })
    error.output.payload.data = error.data;
    reply(error);
}

function handler(request, reply) {
  reply(request.params)
}

server.route({
  method: 'GET',
  path: '/users/{userId?}',
  handler: handler
})

server.route({
  method: 'GET',
  path: '/{stuff*}',
  handler: handlerStuff
})


server.route({
  method: 'GET',
  path: '/files/{file*2}',
  handler: handler
})

server.start(() => console.log(`Started at: ${server.info.uri}`))
