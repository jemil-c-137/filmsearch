const Film = {
  actors: (parent, _, ctx) => {
    const actors = []
    parent.crew.map((member) => {
      if (member.role === ctx.RolesEnum.actor) {
        actors.push(member.person) 
      }
    })
    return actors
  },
  director: (parent, _, ctx) => {
    return parent.crew.filter(member => member.role === ctx.RolesEnum.director)[0].person
  },
  genre: (parent, _, ctx) => {
    return ctx.genres.filter((g) => parent.genre.includes(g.name));
  },
};

module.exports = {
  Film,
};
