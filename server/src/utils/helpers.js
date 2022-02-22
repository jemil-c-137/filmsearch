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

module.exports = {
  makeSlug,
  filmsWithISOdate,
};
