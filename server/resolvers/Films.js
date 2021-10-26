const Film = {
  actors: (parent, _, ctx) => {
    return ctx.actors.filter((a) => parent.actors.includes(a.name));
  },
  director: (parent, _, ctx) => {
    return ctx.directors.filter((d) => d.name === parent.director)[0];
  },
  genre: (parent, _, ctx) => {
    return ctx.genres.filter((g) => parent.genre.includes(g.name));
  },
};

module.exports = {
  Film,
};
