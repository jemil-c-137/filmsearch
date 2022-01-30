const mongoose = require('mongoose');
const {Schema} = mongoose;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  films: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Film"
  }
})

const Genre = mongoose.model("Genre", GenreSchema)

module.exports = {
  GenresCollection: Genre
}