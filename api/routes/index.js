"use strict";

const tasks = require('./task');
const users = require('./user');

const routes = [{
    method: 'GET',
    path: '/',
    config: {
        handler: function (request, reply) {
            return reply.redirect('/documentation');
        },
        description: 'Root URL',
        notes: 'Redirect to Documentation page'
    }
}];

for (var task in tasks) {
    routes.push(tasks[task]);
}

for (var user in users) {
    routes.push(users[user]);
}

module.exports = routes;
