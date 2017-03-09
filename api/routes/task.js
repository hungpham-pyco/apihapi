"use strict";

const taskController = require('../controllers/task');
const taskValidate = require('../validates/task');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: '/tasks/{taskId}',
            config: {
                // handler: taskController.findByID,
                validate: taskValidate.findByID,
                handler: taskController.findByID,
                description: 'Get task',
                notes: 'Returns a task item by the id passed in the path',
                tags: ['api', 'get']
            }
        },
        {
            method: 'GET',
            path: '/tasks',
            config: {
                handler: taskController.find,
                validate: taskValidate.find,
                description: 'Get tasks list',
                notes: 'Returns a tasks list',
                tags: ['api', 'get', 'task']
            }
        },
        {
            method: 'POST',
            path: '/tasks',
            config: {
                handler: taskController.insert,
                validate: taskValidate.insert,
                description: 'create new  task item',
                notes: 'Return 201 when create successful',
                tags: ['api', 'post', 'task']
            }
        },
        {
            method: 'PUT',
            path: '/tasks/{taskId}',
            config: {
                handler: taskController.update,
                validate: taskValidate.update,
                description: 'modify exist a task item',
                notes: 'Return 204 when update successful',
                tags: ['api', 'put', 'task']
            }
        },
        {
            method: 'DELETE',
            path: '/tasks/{taskId}',
            config: {
                handler: taskController.delete,
                validate: taskValidate.delete,
                description: 'remove exist a task item',
                notes: 'Return 204 when delete successful',
                tags: ['api', 'put', 'task']
            }
        }
    ];
}();
