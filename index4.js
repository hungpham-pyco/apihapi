'use strict'
const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({ port: 8000 })

server.state('hello', {
  ttl: 60 * 60 * 1000,
  isHttpOnly: true,
  isSecure: false,
  encoding: 'iron',
  password: 'a5LewP10pXNbWUdYQakUfVlk1jUVuLuUU6E1WEE302k'
})

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: function(request, reply) {
      let hello = request.state.hello
      reply(`Cookies! ${hello}`)
        .state('hello', 'world')
    }
  }
})

server.start(() => console.log(`Started at: ${server.info.uri}`))
