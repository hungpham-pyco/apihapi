"use strict";

var Hapi = require('hapi');
var uuid = require('node-uuid');
const Task = require('../models').Task;
var usersProjection = {
    __v: false,
    _id: false
};
function TaskController() { };
TaskController.prototype = (function () {

    return {
        findByID: function findByID(request, reply) {
            Task.findOne({ taskId: request.params.taskId }, function (err, data) {
                if (err) throw (err);
                console.log('got an item has taskId:', data.taskId);
                reply(data).code(200);
            }).select({ '_id': 0, '__v': 0 })
        },
        find: function find(request, reply) {
            Task.find({}, function (err, data) {
                if (err) throw (err);
                console.log('got data!');
                reply(data).code(200);
            }).select(usersProjection)
        },
        insert: function insert(request, reply) {
            var postTask = request.payload;
            postTask.taskId = uuid.v1();
            var newTask = new Task(postTask);

            newTask.save(function (err) {
                if (err) throw (err);
                console.log('saved to database!');
                reply().code(204);
            })
        },
        update: function update(request, reply) {
            Task.findOneAndUpdate(
                {
                    taskId: request.params.taskId
                },
                request.payload,
                function (err, data) {
                    if (err) throw (err);
                    console.log('updated an item has taskId:', data.taskId);
                    reply().code(204);
                })
        },
        delete: function (request, reply) {
            Task.findOneAndRemove(
                {
                    taskId: request.params.taskId
                },
                function (err, data) {
                    if (err) throw (err);
                    console.log('removed an item has taskId:', data.taskId);
                    reply().code(200);
                })
        }
    }
})();

var taskController = new TaskController();
module.exports = taskController;
