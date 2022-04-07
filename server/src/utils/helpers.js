const makeSlug = (string) => string.toLowerCase().split(' ').join('-');

const filmsWithISOdate = (films) =>
  films.map((film) => {
    const updatedFilm = {
      ...film._doc,
      id: film.id,
      year: film.year.toISOString(),
      yearEnd: film.yearEnd ? film.yearEnd.toISOString() : null,
    };
    return updatedFilm;
  });

const transformSingleFilm = (film) => {
  return {
    ...film._doc,
    id: film.id,
    year: film.year.toISOString(),
    yearEnd: film.yearEnd ? film.yearEnd.toISOString() : null,
  };
};

const getUniqueIds = (currentEntries, newIds) => {
  const currentIds = currentEntries.map((entry) => entry._id.toString());
  const combineIds = [...newIds, ...currentIds];
  const uniqueIds = [...new Set(combineIds)];
  return uniqueIds;
};

const updateFilmInCollection = async (uniqueIds, Collection, fieldToUpdate, filmId, newIds) => {
  uniqueIds.forEach(async (id) => {
    const model = await Collection.findOne({ _id: id });
    // add film to actor
    if (!model._doc[fieldToUpdate].includes(filmId)) {
      await Collection.updateOne({ _id: { $in: id } }, { $push: { [fieldToUpdate]: filmId } });
      console.log(id, 'new actor');
      // remove film from actor
    } else if (!newIds.includes(id)) {
      await Collection.updateOne({ _id: { $in: id } }, { $pull: { [fieldToUpdate]: filmId } });
    }
  });
};

const handleFilterBy = (filterBy) => {
  const filter = {};
  if (typeof filterBy === 'undefined') return filter;
  if (typeof filterBy.year !== 'undefined') {
    filter.year = { $gte: new Date(`${filterBy.year.min}-01-01`), $lte: new Date(`${filterBy.year.max}-12-31`) };
  }
  if (typeof filterBy.directors !== 'undefined') {
    filter.director = [...filterBy.directors];
  }
  if (typeof filterBy.genres !== 'undefined') {
    filter.genres = { $in: [...filterBy.genres] };
  }
  if (typeof filterBy.tvShow !== 'undefined') {
    filter.tvShow = filterBy.tvShow;
  }
  if (typeof filterBy.rate !== 'undefined') {
    filter.rate = { $gte: filterBy.rate.min, $lte: filterBy.rate.max };
  }
  return filter;
};

module.exports = {
  makeSlug,
  filmsWithISOdate,
  transformSingleFilm,
  getUniqueIds,
  updateFilmInCollection,
  handleFilterBy,
};
