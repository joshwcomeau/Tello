const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  tvMazeId: Number,
  name: String,
  image: String,
  status: String,
  type: String,
  summary: String,
  region: String,
  seenEpisodes: { type: [String], default: [] },
});

const Show = mongoose.model('Show', ShowSchema);

module.exports.ShowSchema = ShowSchema;
module.exports.Show = Show;
