const Query = {
  films: (parent, args, { films }) => {
    return films
  },
  directors: (parent, args, { directors }) => directors,
  genres: (parent, args, { genres }) => genres,
  actors: (parent, args, { actors }) => actors,
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
