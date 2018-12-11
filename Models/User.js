const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  longens: [{ type: Schema.Types.ObjectId, ref: 'longens' }]
});

module.exports = mongoose.model('users', UserSchema);
