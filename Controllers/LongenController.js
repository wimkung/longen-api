const User = require('../Models/User');
const Longen = require('../Models/Longen');

exports.list = async function(req, h) {
  let query = {};

  if (req.query.address) {
    query.address = {
      $regex: `${req.query.address}`,
      $options: 'i'
    };
  }

  const longens = await Longen.find(query).populate('owner');

  return longens;
};

exports.show = async function(req, h) {
  let longen = await Longen.findOne({ _id: req.params.longen_id }).populate(
    'owner'
  );

  if (!longen) {
    let data = { msg: 'Longen find not found.' };

    return h.response(data).code(404);
  }

  return longen;
};

exports.create = async function(req, h) {
  const user = await User.findOne({ username: req.payload.username });

  if (!user) {
    let data = { msg: 'User find not found.' };

    return h.response(data).code(404);
  }

  let longen = new Longen();
  longen.owner = user._id;
  longen.address = req.payload.address;
  longen.amount = req.payload.amount;
  longen.long = req.payload.long;
  longen.lat = req.payload.lat;
  longen.price = req.payload.price;
  await longen.save();

  return longen;
};

exports.update = async function(req, h) {
  const user = await User.findOne({ username: req.payload.username });

  if (!user) {
    let data = { msg: 'User find not found.' };

    return h.response(data).code(404);
  }

  let longen = await Longen.findOne({
    _id: req.payload.longen_id,
    owner: user._id,
    status: true
  });

  if (!longen) {
    let data = { msg: 'Longen find not found.' };

    return h.response(data).code(404);
  }

  longen.address = req.payload.address;
  longen.amount = req.payload.amount;
  longen.long = req.payload.long;
  longen.lat = req.payload.lat;
  longen.price = req.payload.price;
  let updatedLongen = await longen.save();

  return updatedLongen;
};

exports.delete = async function(req, h) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    let data = { msg: 'User find not found.' };

    return h.response(data).code(404);
  }

  let longen = await Longen.deleteOne({
    _id: req.params.longen_id,
    owner: user._id
  });

  if (longen.n != 1) {
    let data = { msg: 'Longen find not found.' };

    return h.response(data).code(404);
  }

  let data = { msg: 'Longen deleted.' };

  return h.response(data).code(200);
};
