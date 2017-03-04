const Joi = require('joi');
var Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

var TaskSchema = new Schema({
    taskId: {
        type: String,
        required: true
    },
    effort: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

var Task = Mongoose.model('task', TaskSchema);

exports.Task = Task;
