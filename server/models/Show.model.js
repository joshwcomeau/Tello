const mongoose = require('mongoose');;


const ShowSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  summary: String,
  seenEpisodes: [String],
});

const Show = mongoose.model('Show', ShowSchema);

module.exports.ShowSchema = ShowSchema;
module.exports.Show = Show;
