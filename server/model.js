const mongoose = require('mongoose');
const { Schema } = mongoose;


const PersonModel = new Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('persons', PersonModel)

module.exports = {
  PersonCollection: Person
}

