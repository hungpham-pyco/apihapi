"use strict";

const Joi = require('joi');

const models = require('../models/user');

function UserValidate() { };
UserValidate.prototype = (function () {

    return {
        findByID: {
            params: {
                userId: Joi.string().max(255)
            }
        },
        find: {

        },
        insert: {
            payload: {
                fullName: Joi.string().max(255).min(3).max(60).required(),
                email: Joi.string().email().max(255).required(),
                password: Joi.string().max(255).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                birthday: Joi.string().max(255),
                about: Joi.string().max(255)
            }
        },
        update: (function update() {
            return {
                params: {
                    userId: Joi.string().max(255)
                },
                payload: {
                    fullName: Joi.string().max(255),
                    email: Joi.string().max(255),
                    birthday: Joi.string().max(255),
                    about: Joi.string().max(255)
                }
            }
        })(),
        delete: {
            params: {
                userId: Joi.string().max(255)
            }
        }
    };
})();

const userValidate = new UserValidate();
module.exports = userValidate;
