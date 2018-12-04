const User = require('../Models/User');
const Longen = require('../Models/Longen');

exports.list = async function (req, h) {
    const longens = await Longen.find().populate('owner');

    return longens;
};

exports.show = async function (req, h) {
    let longen = await Longen.findOne({_id: req.payload.longen_id}).populate('owner');

    if (longen){
        let data = {msg: 'Longen find not found.'};

        return h.response(data).code(422);
    }

    return longen;
};

exports.create = async function (req, h) {
    const user = await User.findOne({username: req.payload.username});

    if (user){
        let data = {msg: 'User find not found.'};

        return h.response(data).code(422);
    }

    let longen = new Longen();
    longen.owner = user._id;
    longen.address = req.payload.address;
    longen.amount = req.payload.address;
    longen.long = req.payload.address;
    longen.lat = req.payload.address;
    longen.price = req.payload.address;
    await longen.save();

    return longen;
};

exports.update = async function (req, h) {
    const user = await User.findOne({username: req.payload.username});

    if (user){
        let data = {msg: 'User find not found.'};

        return h.response(data).code(422);
    }

    let longen = await Longen.findOne({_id: req.payload.longen_id, owner: user._id});

    if (longen){
        let data = {msg: 'Longen find not found.'};

        return h.response(data).code(422);
    }

    longen.address = req.payload.address;
    longen.amount = req.payload.address;
    longen.long = req.payload.address;
    longen.lat = req.payload.address;
    longen.price = req.payload.address;
    await longen.save();

    return longen;
};

exports.delete = async function (req, h) {
    const user = await User.findOne({username: req.payload.username});

    if (user){
        let data = {msg: 'User find not found.'};

        return h.response(data).code(422);
    }

    let longen = await Longen.deleteOne({_id: req.payload.longen_id, owner: user._id});

    if (longen){
        let data = {msg: 'Longen find not found.'};

        return h.response(data).code(422);
    }

    await longen.delete();

    return longen;
};