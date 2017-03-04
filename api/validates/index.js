"use strict";

const Joi = require('joi');

const models = require('../models');

function TaskValidate() { };
TaskValidate.prototype = (function () {

    return {
        findByID: {
            params: {
                    taskId: Joi.string().max(255)
                }
        },
        find: {

        },
        insert: {
            payload: {
                    effort: Joi.number().integer(),
                    description: Joi.string().max(255)
                }
        },
        update: (function update() {
            return {
                params: {
                    taskId: Joi.string().max(255)
                },
                payload: {
                    effort: Joi.number().integer(),
                    description: Joi.string().max(255)
                }
            }
        })(),
        delete: {
            params: {
                taskId: Joi.string().max(255)
            }
        }
    };
})();

const taskValidate = new TaskValidate();
module.exports = taskValidate;
