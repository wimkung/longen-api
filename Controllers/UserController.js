const User = require('../Models/User');

exports.listUser = function (req, h) {
    const users = User.find();

    return users;
};

exports.createUser = async function (req, h) {
    let user = User.findOne({name: req.payload.name});

    if (user == null){
        user = new User();
        user.name = req.payload.name;
        await user.save();
    }

    return user;
};