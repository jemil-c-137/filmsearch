const Query = {
  films: (parent, args, { films }) => {
    return films
  },
  directors: (parent, args, { directors }) => directors,
  genres: (parent, args, { genres }) => genres,
  actors: (parent, args, { actors }) => actors,
  persons: (parent, args, { persons }) => persons,
  person: (parent, args, { persons }) => {
    return persons.find((p) => p.slug === args.slug);
  },
  film: (parent, args, { films }) => {
    return films.find((f) => f.slug === args.slug);
  },
  actor: (parent, args, { actors }) => {
    return actors.find((a) => a.slug === args.slug);
  },
  director: (parent, args, { directors }) => {
    return directors.find((d) => d.slug === args.slug);
  },
};

module.exports = {
  Query,
};
