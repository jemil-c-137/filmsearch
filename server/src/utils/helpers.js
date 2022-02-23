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

module.exports = {
  makeSlug,
  filmsWithISOdate,
  transformSingleFilm,
};
