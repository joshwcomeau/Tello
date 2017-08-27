const mongoose = require('mongoose');;

const { ShowSchema, getPublicShow } = require('./Show.model');

const UserSchema = new mongoose.Schema({
  token: String,
  name: String,
  googleId: String,
  email: String,
  trackedShows: [ShowSchema],
});

UserSchema.methods.addShows = function addShows(shows, cb) {
  // The shows have an `id` field. We need to copy that to `_id` for mongo
  const showsWithId = shows.map(show => (
    Object.assign({}, show, { _id: show.id })
  ));

  this.trackedShows = [...this.trackedShows, ...showsWithId];
  this.save(cb);
}

const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;

module.exports.getPublicUser = user => ({
  id: user._id,
  name: user.name,
  email: user.email,
  trackedShows: user.trackedShows.map(getPublicShow),
});
