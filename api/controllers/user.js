"use strict";

var Hapi = require('hapi');
var uuid = require('node-uuid');
const User = require('../models/user').User;
var usersProjection = {
    __v: false,
    _id: false
};
function userController() { };
userController.prototype = (function () {

    return {
        findByID: function findByID(request, reply) {
            User.findOne({ userId: request.params.userId }, function (err, data) {
                if (err) throw (err);
                console.log('got an item has userId:', data.userId);
                reply(data).code(200);
            }).select({ '_id': 0, '__v': 0 })
        },
        find: function find(request, reply) {
            User.find({}, function (err, data) {
                if (err) throw (err);
                console.log('got data!');
                reply(data).code(200);
            }).select(usersProjection)
        },
        insert: function insert(request, reply) {
            var postUser = request.payload;
            postUser.userId = uuid.v1();
            var newUser = new User(postUser);

            newUser.save(function (err) {
                if (err) throw (err);
                console.log('saved to database!');
                reply().code(204);
            })
        },
        update: function update(request, reply) {
            User.findOneAndUpdate(
                {
                    userId: request.params.userId
                },
                request.payload,
                function (err, data) {
                    if (err) throw (err);
                    console.log('updated an item has userId:', data.userId);
                    reply().code(204);
                })
        },
        delete: function (request, reply) {
            User.findOneAndRemove(
                {
                    userId: request.params.userId
                },
                function (err, data) {
                    if (err) throw (err);
                    console.log('removed an item has userId:', data.userId);
                    reply().code(200);
                })
        }
    }
})();

var userController = new userController();
module.exports = userController;
