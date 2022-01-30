const mongoose = require('mongoose');
const { Schema } = mongoose;


const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
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
  },
  directed: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Film"
  },
  acted: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Film"
  }
})

const Person = mongoose.model('Person', PersonSchema)

module.exports = {
  PersonCollection: Person,
  PersonSchema
}

