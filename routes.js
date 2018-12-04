const UserController = require('./Controllers/UserController');

module.exports = [
    {
        method: 'GET',
        path: '/user',
        handler: UserController.listUser,
    },
    {
        method: 'POST',
        path: '/user',
        handler: UserController.createUser,
    }
];