const Film = {
  actors: (parent) => {
    return parent.actors;
  },
  director: (parent) => {
    return parent.director;
  },
  genres: async (parent) => {
    return parent.genres;
  },
};

module.exports = {
  Film,
};
