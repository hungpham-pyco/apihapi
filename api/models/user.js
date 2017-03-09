const Joi = require('joi');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    access_token: {
        type: String
    },
    birthday: {
        type: String
    },
    about: {
        type: String
    }
});

const User = Mongoose.model('user', UserSchema);

exports.User = User;
