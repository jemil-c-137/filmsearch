const Director = {
  films: (parent, _, { films }) => {
    return films.filter((f) => f.director === parent.name);
  },
};

module.exports = {
  Director,
};
