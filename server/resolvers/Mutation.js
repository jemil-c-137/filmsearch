const { PersonCollection } = require('../models/Persons');
const { FilmsCollection } = require('../models/Films');
const { makeSlug } = require('../utils/helpers');
const { GenresCollection } = require('../models/Genre');

const Mutation = {
  addPerson: async (_, args) => {
    const { name, birthDate, image, bio } = args.input;
    const slug = makeSlug(name)
    const person = await PersonCollection.create({
      name,
      birthDate,
      image,
      bio,
      slug,
    });
    return person
      .save()
      .then((res) => {
        console.log(res, 'res');
        return { ...res._doc };
      })
      .catch((err) => {
        console.log('err', err);
      });
  },
  addFilm: async (_, args) => {
    const { input } = args;
    const slug = makeSlug(input.title)
    const { director, actors } = input;
    try {
      const film = new FilmsCollection({
        ...input,
        slug,
      });
      film.save();
      await PersonCollection.updateOne({ _id: { $in: director } }, { $push: { directed: film.id } });
      await PersonCollection.updateMany({ _id: { $in: actors } }, { $push: { acted: film.id } });
    } catch (error) {
      console.log(error);
    }
  },
  addGenre: async (_, args) => {
    console.log(args, 'args')
    const {name} = args;
    const slug = makeSlug(name)
    try {
      const genre = new GenresCollection({
        slug,
        name
      })
      genre.save()
      return true
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = {
  Mutation,
};
