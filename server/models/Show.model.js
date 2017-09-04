const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  image: String,
  status: String,
  type: String,
  summary: String,
  region: String,
  seenEpisodeIds: { type: [Number], default: [] },
}, {
  timestamps: true,
});

ShowSchema.methods.getPublic = function getPublic() {
  return {
    id: this._id,
    createdAt: this.createdAt,
    name: this.name,
    image: this.image,
    status: this.status,
    type: this.type,
    summary: this.summary,
    region: this.region,
    seenEpisodeIds: this.seenEpisodeIds,
  };
}

const Show = mongoose.model('Show', ShowSchema);

module.exports.ShowSchema = ShowSchema;
module.exports.Show = Show;
