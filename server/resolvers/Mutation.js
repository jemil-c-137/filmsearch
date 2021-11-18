const { v4: uuidv4 } = require('uuid');
const { persons } = require('../db');

const Mutation = {
  addPerson: (parent, args) => {
    const person = args.input
    const personsList = persons;
    const slug = args.input.name.toLowerCase().split(" ").join("-")
    const newPerson = {
      ...person,
      slug,
      id: uuidv4()
    }
    console.log(newPerson)
    persons.push(newPerson)
    return newPerson
  }
}

module.exports = {
  Mutation
}