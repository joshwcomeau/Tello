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
  shows = shows.map(show => ({
    tvMazeId: show.id,
    name: show.name,
    image: show.image,
    status: show.status,
    type: show.type,
    summary: show.summary,
    region: show.region,
    seenEpisodes: [],
  }));
  
  this.trackedShows = [...this.trackedShows, ...shows];
  this.save(cb);
}

const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;
