const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'users'},
    longen: { type: Schema.Types.ObjectId, ref: 'longens'},
}, {
    timestamp: true,
});

module.exports = mongoose.model('transactions', TransactionSchema);