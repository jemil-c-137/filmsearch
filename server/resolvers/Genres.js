const Genre = {
  films: (parent, _, ctx) => {
    return ctx.films.filter((f) => f.genre.includes(parent.name));
  },
};

module.exports = {
  Genre,
};
