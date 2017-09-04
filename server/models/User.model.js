const mongoose = require('mongoose');
const _ = require('lodash');

const { ShowSchema } = require('./Show.model');

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

UserSchema.methods.toggleEpisodes = function(
  { markAs, showId, episodeIds },
  cb
) {
  const showIndex = this.trackedShows.findIndex(show => show._id === showId);
  const show = this.trackedShows[showIndex];

  if (markAs === 'seen') {
    show.seenEpisodeIds = _.uniq([...show.seenEpisodeIds, ...episodeIds]);
  } else {
    show.seenEpisodeIds = show.seenEpisodeIds.filter(id => (
      !episodeIds.includes(id)
    ));
  }

  this.save(cb);
};

UserSchema.methods.deleteShow = function({ showId }, cb) {
  this.trackedShows = this.trackedShows.filter(show => show._id !== showId);

  this.save(cb);
};

UserSchema.methods.getPublic = function getPublic() {
  const shows = this.trackedShows.map(show => show.getPublic());

  // Build up a 'map' type object.
  const showsMap = shows.reduce((acc, show) => (
    Object.assign(
      {},
      acc,
      { [show.id]: show }
    )
  ), {});

  return {
    id: this._id,
    name: this.name,
    email: this.email,
    trackedShows: showsMap,
  };
}


const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;
