const { PersonCollection } = require('../models/Persons');
const { FilmsCollection } = require('../models/Films');
const { GenresCollection } = require('../models/Genre');
const { makeSlug } = require('../utils/helpers');
const { uploadFile } = require('../utils/cloudinaryUpload');

const Mutation = {
  addPerson: async (_, args) => {
    const { name, birthDate, image, bio } = args.input;
    const slug = makeSlug(name);
    const file = await uploadFile(image.file);
    const person = await PersonCollection.create({
      name,
      birthDate,
      image: file.secure_url,
      bio,
      slug,
    });
    return person
      .save()
      .then((res) => {
        return { ...res._doc, id: res._doc._id };
      })
      .catch((err) => {
        console.log('err', err);
      });
  },
  addFilm: async (_, args) => {
    const { input } = args;
    const { director, actors, genres } = input;

    const image = input.image.file;

    const file = await uploadFile(image);

    const slug = makeSlug(input.title);
    try {
      const film = new FilmsCollection({
        ...input,
        slug,
        image: file.secure_url,
      });
      film.save().then((res) => {
        console.log('successfully saved');
      });
      await PersonCollection.updateOne({ _id: { $in: director } }, { $push: { directed: film.id } });
      await PersonCollection.updateMany({ _id: { $in: actors } }, { $push: { acted: film.id } });
      await GenresCollection.updateMany({ _id: { $in: genres } }, { $push: { films: film.id } });
    } catch (error) {
      console.log('Error: ', error);
    }
  },
  addGenre: async (_, args) => {
    const { name } = args;
    const slug = makeSlug(name);
    try {
      const genre = new GenresCollection({
        slug,
        name,
      });
      genre.save();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
  testMutation: async (_, args) => {
    return 'success';
  },
  fileUpload: async (parent, { file }) => {
    let url = [];
    return true;
  },
};

module.exports = {
  Mutation,
};
