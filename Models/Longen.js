const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LongenSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'users'},
    address: String,
    amount: Number,
    price: Number,
    long: Number,
    lat: Number,
    status: Boolean,
}, {
    timestamp: true,
});

module.exports = mongoose.model('longens', LongenSchema);
