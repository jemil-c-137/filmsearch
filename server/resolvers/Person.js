
const Person = {
  films: (parent, _, { films }) => {
    let filmed = [];
    films.map((film) => {
      film.crew.map((person) => {
        if (person.person.name === parent.name) {
          filmed.push({ film, role: person.role });
        }
      });
    });
    return filmed;
  },
};

module.exports = {
  Person,
};
