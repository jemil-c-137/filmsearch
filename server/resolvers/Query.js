const { FilmsCollection } = require('../models/Films');
const { GenresCollection } = require('../models/Genre');
const { PersonCollection } = require('../models/Persons');

const Query = {
  films: async () => {
    const films = await FilmsCollection.find().populate('genres');
    return films;
  },
  film: async (parent, args, { films }) => {
    const { id } = args;
    const film = await FilmsCollection.findById(id).populate('director').populate('actors').populate('genres');
    return film;
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
  person: async (parent, args, { persons }) => {
    const { id } = args;
    const res = await PersonCollection.findById(id).populate('directed').populate('acted');
    const person = {
      ...res._doc,
      birthDate: res.birthDate.toISOString(),
    };
    return person;
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
