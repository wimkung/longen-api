const User = require('../Models/User');

exports.listUser = async function(req, h) {
  const users = await User.find().populate('longens');

  return users;
};

exports.showUser = async function(req, h) {
  const user = await User.findOne({ _id: req.params.user_id }).populate(
    'longens'
  );
  if (!user) {
    let data = {
      msg: 'User find not found.'
    };

    return h.responce(data).code(404);
  }

  return user;
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
