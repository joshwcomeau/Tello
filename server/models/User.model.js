const mongoose = require('mongoose');;

const {ShowSchema} = require('./Show.model');

const UserSchema = new mongoose.Schema({
  token: String,
  name: String,
  googleId: String,
  email: String,
  trackedShows: [ShowSchema],
});

UserSchema.methods.addShows = function addShows(shows, cb) {
  this.trackedShows = [...this.trackedShows, ...shows];
  this.save(cb);
}

const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;
