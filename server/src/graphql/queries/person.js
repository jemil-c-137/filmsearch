const Person = {
  acted: (parent) => parent.acted, // films person acted in
  directed: (parent) => parent.directed,
};

module.exports = {
  Person,
};
