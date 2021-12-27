const mongoose = require('mongoose');
const { PersonModel } = require('./Persons');
const { Schema } = mongoose;


const FilmSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: false
  },
  tvShow: {
    type: Boolean,
    required: false,
  },
  director: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Person"
  },
  actors: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Person"
  },
  operator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Person"
  },
  screenwriter: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Person"
  },
  producers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Person"
  },
  genres: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Genre"
  }
})

const Film = mongoose.model('Film', FilmSchema)

module.exports = {
  FilmsCollection: Film
}
