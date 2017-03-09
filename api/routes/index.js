"use strict";

const tasks = require('./task');
const users = require('./user');

const routes = [];

for (var task in tasks) {
    routes.push(tasks[task]);
}

for (var user in users) {
    routes.push(users[user]);
}

module.exports = routes;
