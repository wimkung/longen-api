const User = require('../Models/User');

exports.listUser = async function(req, h) {
  const users = await User.find();

  return users;
};

exports.createUser = async function(req, h) {
  let user = await User.findOne({ username: req.payload.username });

  if (user == null) {
    user = new User();
    user.username = req.payload.username;
    user.firstName = req.payload.firstName;
    user.lastName = req.payload.lastName;
    await user.save();
  }

  return user;
};
