const mongoose = require('mongoose');
const { PersonModel } = require('./person');
const { Schema } = mongoose;

const FilmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false,
  },
  tvShow: {
    type: Boolean,
    required: false,
  },
  yearEnd: {
    type: Date,
    required: false,
  },
  director: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Person',
  },
  actors: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Person',
  },
  genres: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Genre',
  },
});

const Film = mongoose.model('Film', FilmSchema);

module.exports = {
  FilmsCollection: Film,
};
