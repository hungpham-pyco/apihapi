'use strict'
const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()
server.connection({ port: 8000 })

server.route({
  method: ['POST','PUT'],
  path: '/user/{id?}',
  config: {
    validate: {
      payload: Joi.object().keys({
        id: Joi.number(),
        number: Joi.number()
      }),
      params: Joi.object().keys({
        id: Joi.number()
      })

    },
    handler: function(request, reply) {
      reply({
        params: request.params,
        query: request.query,
        payload: request.payload
      })
    }
  }
})

server.start(() => console.log(`Started at: ${server.info.uri}`))
