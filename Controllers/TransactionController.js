const User = require('../Models/User');
const Longen = require('../Models/Longen');
const Transaction = require('../Models/Transaction');

exports.list = async function(req, h) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    let data = { msg: 'User find not found.' };

    return h.response(data).code(404);
  }

  const transactions = await Transaction.find({ buyer: user._id }).populate(
    'longen'
  );

  return h.response(transactions).code(200);
};

exports.create = async function(req, h) {
  const user = await User.findOne({ username: req.payload.username });

  if (!user) {
    let data = { msg: 'User find not found.' };

    return h.response(data).code(404);
  }

  let longen = await Longen.findOne({
    _id: req.payload.longen_id,
    status: true
  });

  if (!longen) {
    let data = { msg: 'Longen find not found.' };

    return h.response(data).code(404);
  }

  let transaction = new Transaction();
  transaction.buyer = user._id;
  transaction.longen = longen._id;
  await transaction.save();

  longen.status = false;
  await longen.save();

  return h.response(transaction).code(201);
};
