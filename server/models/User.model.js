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

UserSchema.methods.toggleEpisode = function({ isSeen, showId, episodeId }, cb) {
  // TODO: Convert `trackedShows` to a map. Move that logic from client to server.
  // Will make it much simpler to do this method.
  const showIndex = this.trackedShows.findIndex(show => show.id === showId);
  const show = this.trackedShows[showIndex];

  const alreadySeen = show.seenEpisodeIds.includes(episodeId);

  // If the status is already as intended, we can bail early.
  if (isSeen === alreadySeen) {
    return cb();
  }

  show.seenEpisodeIds = isSeen
    ? [...show.seenEpisodeIds, episodeId]
    : show.seenEpisodeIds.filter(id => id !== episodeId);

  this.save(cb);
};

const User = mongoose.model('User', UserSchema);

module.exports.UserSchema = UserSchema;
module.exports.User = User;

module.exports.getPublicUser = user => {
  const shows = user.trackedShows.map(getPublicShow);

  // Build up a 'map' type object.
  const showsMap = shows.reduce((acc, show) => (
    Object.assign(
      {},
      acc,
      { [show.id]: show }
    )
  ), {});

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    trackedShows: showsMap,
  };
};
