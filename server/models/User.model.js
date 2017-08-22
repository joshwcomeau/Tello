const { model, Schema } = require('mongoose');;

const {ShowSchema} = require('./Show.model');

const UserSchema = new Schema({
  name: String,
  email: String,
  provider: String,
  shows: [ShowSchema],
});

const User = model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;
