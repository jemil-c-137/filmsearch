const { GenresCollection } = require('../models/Genre');
const { PersonCollection } = require('../models/Persons');

const Query = {
  films: (parent, args, { films }) => {
    return films;
  },
  directors: (parent, args, { directors }) => directors,
  genres: async () => {
    const allGenres = await GenresCollection.find();
    return allGenres;
  },
  actors: (parent, args, { actors }) => actors,
  persons: async () => {
    const allPersons = await PersonCollection.find();
    return allPersons;
  },
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
