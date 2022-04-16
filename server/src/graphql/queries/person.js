const Person = {
  acted: (parent) => parent.acted, // films person acted in
  directed: (parent) => {
    console.log('parent', parent.directed);
    return parent.directed;
  },
};

module.exports = {
  Person,
};
