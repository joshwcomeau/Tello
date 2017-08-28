const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  image: String,
  status: String,
  type: String,
  summary: String,
  region: String,
  seenEpisodeIds: { type: [String], default: [] },
});

const Show = mongoose.model('Show', ShowSchema);

module.exports.ShowSchema = ShowSchema;
module.exports.Show = Show;

module.exports.getPublicShow = show => ({
  id: show._id,
  name: show.name,
  image: show.image,
  status: show.status,
  type: show.type,
  summary: show.summary,
  region: show.region,
  seenEpisodeIds: show.seenEpisodeIds,
});
