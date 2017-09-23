const mongoose = require('mongoose');
const _ = require('lodash');

const { ShowSchema } = require('./Show.model');
const { getImageFilenameForShow, uploadImage } = require('../helpers/image.helpers');

const UserSchema = new mongoose.Schema({
  token: String,
  name: String,
  googleId: String,
  email: String,
  trackedShows: [ShowSchema],
});


UserSchema.methods.addShows = function addShows(shows, cb) {
  // For each show that has an image, upload that image, and replace the
  // image URL with the newly-uploaded one.
  const uploadPromises = shows.map(show => (
    uploadImage({
      key: getImageFilenameForShow(show),
      url: show.image,
    })
  ));

  // TODO: Imgix is slow the first time you set an image. Maybe we ought
  // to return the given TVMaze URL, just this once, so that the show
  // you just added shows up faster?
  Promise.all(uploadPromises)
    .then((showImageUrls) => {
      const formattedShows = shows.map((show, index) => (
        Object.assign({}, show, {
          // The shows have an `id` field. We need to copy that to `_id`
          // for mongo
          _id: show.id,
          image: showImageUrls[index],
        })
      ));

      this.trackedShows = [...this.trackedShows, ...formattedShows];
      this.save(cb);
    })
    .catch(err => console.error(err));
};


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
