const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LongenSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'users'},
    address: String,
    amount: Number,
    price: Number,
    long: Number,
    lat: Number,
    status: {type: Boolean, default: true},
}, {
    timestamp: true,
});

module.exports = mongoose.model('longens', LongenSchema);
