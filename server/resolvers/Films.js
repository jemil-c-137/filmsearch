const { GenresCollection } = require('../models/Genre');

const Film = {
  actors: (parent, _, ctx) => {
    return parent.actors;
  },
  director: (parent, _, ctx) => {
    return parent.director;
  },
  genres: async (parent, _, ctx) => {
    return parent.genres;
  },
};

module.exports = {
  Film,
};
