const { FilmsCollection } = require('../../data/models/film');
const { GenresCollection } = require('../../data/models/genre');
const { PersonCollection } = require('../../data/models/person');

const Query = {
  films: async () => {
    const films = await FilmsCollection.find().populate('genres');
    return films;
  },
  film: async (_, args) => {
    const { slug } = args;
    const res = await FilmsCollection.findOne({ slug }).populate('director').populate('actors').populate('genres');
    const film = {
      ...res._doc,
      year: res.year.toISOString(),
    };
    console.log(film, 'film');
    return film;
  },
  filmsByGenre: async (_, args) => {
    const { slug } = args;
    const genre = await GenresCollection.findOne({ slug })
      .populate('films')
      .populate({ path: 'films', populate: { path: 'genres' } });
    return genre.films;
  },
  genres: async () => {
    const allGenres = await GenresCollection.find();
    return allGenres;
  },
  persons: async () => {
    const allPersons = await PersonCollection.find();
    return allPersons;
  },
  person: async (_, args) => {
    const { slug } = args;
    const res = await PersonCollection.findOne({ slug }).populate('directed').populate('acted');
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
