const { FilmsCollection } = require('../../data/models/film');
const { GenresCollection } = require('../../data/models/genre');
const { PersonCollection } = require('../../data/models/person');
const { filmsWithISOdate, handleFilterBy } = require('../../utils/helpers');
const Query = {
  films: async (_, { sortBy, filterBy }) => {
    const sorting = {
      [sortBy.field]: sortBy.order === 'ASC' ? 1 : -1,
    };

    const filter = handleFilterBy(filterBy);

    console.log(filterBy, 'filterBy');
    console.log(filter, 'filter');

    console.log(sorting, 'sortby');
    const films = await FilmsCollection.find(filter).sort(sorting).populate('genres');
    const preparedFilms = filmsWithISOdate(films);
    return preparedFilms;
  },
  film: async (_, args) => {
    const { slug } = args;
    const res = await FilmsCollection.findOne({ slug }).populate('director').populate('actors').populate('genres');
    const film = {
      ...res._doc,
      id: res.id,
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
    const allPersons = await PersonCollection.find().populate('directed');
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
  directors: async () => {
    const directors = await PersonCollection.find({ directed: { $exists: true, $not: { $size: 0 } } });
    return directors;
  },
};

module.exports = {
  Query,
};
