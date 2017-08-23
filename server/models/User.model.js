const mongoose = require('mongoose');;

const {ShowSchema} = require('./Show.model');

const UserSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  googleToken: String,
  email: String,
  shows: [ShowSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;
