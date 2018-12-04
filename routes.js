const Joi = require('joi');
const UserController = require('./Controllers/UserController');

module.exports = [
    {
        method: 'GET',
        path: '/user',
        options: {
            handler: UserController.listUser,
            description: 'Get All users.',
            tags: ['api', 'user'],
        },

    },
    {
        method: 'POST',
        path: '/user',
        options: {
            handler: UserController.createUser,
            description: 'Create new user.',
            tags: ['api', 'user'],
            validate: {
                payload: {
                    username: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),

                }
            }
        },

    }
];