const { FilmsCollection } = require('../../data/models/film');
const { GenresCollection } = require('../../data/models/genre');
const { PersonCollection } = require('../../data/models/person');
const { filmsWithISOdate } = require('../../utils/helpers');
const Query = {
  films: async () => {
    const films = await FilmsCollection.find().populate('genres');
    const preparedFilms = filmsWithISOdate(films);
    return preparedFilms;
  },
  film: async (_, args) => {
    const { slug } = args;
    const res = await FilmsCollection.findOne({ slug }).populate('director').populate('actors').populate('genres');
    const film = {
      ...res._doc,
      year: res.year.toISOString(),
      yearEnd: res.yearEnd ? res.yearEnd.toISOString() : null,
    };
    return film;
  },
  filmsByGenre: async (_, args) => {
    const { slug } = args;
    const genre = await GenresCollection.findOne({ slug })
      .populate('films')
      .populate({ path: 'films', populate: { path: 'genres' } });
    const films = filmsWithISOdate(genre.films);
    return films;
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
