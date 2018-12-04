const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    longens: [{ type: Schema.Types.ObjectId, ref: 'Longen'}],
});

module.exports = mongoose.model('User', UserSchema);