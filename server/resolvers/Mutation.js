const { v4: uuidv4 } = require('uuid');
const {PersonCollection} = require('../model')

const Mutation = {
  addPerson: (parent, args) => {
    const {name, birthDate, image, bio} = args.input;
    console.log(args, 'args')
    const slug = args.input.name.toLowerCase().split(" ").join("-")
    const person = new PersonCollection({
      name,
      birthDate,
      image,
      bio,
      slug
    })
    return person.save().then(res => {
      console.log(res, 'res')
      return {...res._doc}
    }).catch(err => {
      console.log('err', err)
    })
  },
}

module.exports = {
  Mutation
}