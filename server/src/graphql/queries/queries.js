const { FilmsCollection } = require('../../data/models/film');
const { GenresCollection } = require('../../data/models/genre');
const { PersonCollection } = require('../../data/models/person');

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
  genres: async () => {
    const allGenres = await GenresCollection.find();
    return allGenres;
  },
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
};

module.exports = {
  Query,
};
