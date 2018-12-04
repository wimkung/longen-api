const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User'},
    longen: { type: Schema.Types.ObjectId, ref: 'Longen'},
}, {
    timestamp: true,
});

module.exports = mongoose.model('Transaction', TransactionSchema);