const Actor = {
  films: (parent, _, ctx) => {
    return ctx.films.filter((f) => f.actors.includes(parent.name));
  },
};


module.exports = {
  Actor,
};
