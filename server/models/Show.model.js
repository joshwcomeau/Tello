const { model, Schema } = require('mongoose');;


const ShowSchema = new Schema({
  name: String,
  type: String,
  status: String,
  summary: String,
  seenEpisodes: [String],
});

const Show = model('Show', ShowSchema);

module.exports.ShowSchema = ShowSchema;
module.exports.Show = Show;
