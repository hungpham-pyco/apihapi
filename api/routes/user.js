"use strict";

const userController = require('../controllers/user');
const userValidate = require('../validates/user');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: '/users/{userId}',
            config: {
                // handler: userController.findByID,
                validate: userValidate.findByID,
                handler: userController.findByID,
                description: 'Get user',
                notes: 'Returns a user item by the id passed in the path',
                tags: ['api', 'get', 'user']
            }
        },
        {
            method: 'GET',
            path: '/users',
            config: {
                handler: userController.find,
                validate: userValidate.find,
                description: 'Get users list',
                notes: 'Returns a users list',
                tags: ['api', 'get', 'user']
            }
        },
        {
            method: 'POST',
            path: '/users',
            config: {
                handler: userController.insert,
                validate: userValidate.insert,
                description: 'create new  user item',
                notes: 'Return 201 when create successful',
                tags: ['api', 'post', 'user']
            }
        },
        {
            method: 'PUT',
            path: '/users/{userId}',
            config: {
                handler: userController.update,
                validate: userValidate.update,
                description: 'modify exist a user item',
                notes: 'Return 204 when update successful',
                tags: ['api', 'put', 'user']
            }
        },
        {
            method: 'DELETE',
            path: '/users/{userId}',
            config: {
                handler: userController.delete,
                validate: userValidate.delete,
                description: 'remove exist a user item',
                notes: 'Return 204 when delete successful',
                tags: ['api', 'put', 'user']
            }
        }
    ];
}();
