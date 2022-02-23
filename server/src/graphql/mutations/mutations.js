const { nanoid } = require('nanoid');

const { PersonCollection } = require('../../data/models/person');
const { FilmsCollection } = require('../../data/models/film');
const { GenresCollection } = require('../../data/models/genre');
const { makeSlug, transformSingleFilm, getUniqueIds, updateFilmInCollection } = require('../../utils/helpers');
const { uploadFile } = require('../../utils/cloudinaryUpload');

const Mutation = {
  addPerson: async (_, args) => {
    const { name, birthDate, image, bio } = args.input;
    const slug = makeSlug(name);
    const id = nanoid();
    const slugId = `${slug}-${id}`;
    const file = await uploadFile(image.file);
    const person = await PersonCollection.create({
      name,
      birthDate,
      image: file.secure_url,
      bio,
      slug: slugId,
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
    const id = nanoid();
    const slugId = `${slug}-${id}`;
    try {
      const film = await new FilmsCollection({
        ...input,
        slug: slugId,
        image: file.secure_url,
      });

      await PersonCollection.updateOne({ _id: { $in: director } }, { $push: { directed: film.id } });
      await PersonCollection.updateMany({ _id: { $in: actors } }, { $push: { acted: film.id } });
      await GenresCollection.updateMany({ _id: { $in: genres } }, { $push: { films: film.id } });
      return film
        .save()
        .then(async (res) => {
          await res.populate('genres');
          return {
            ...res._doc,
            id: res._doc._id,
            year: film.year.toISOString(),
            yearEnd: film.yearEnd ? film.yearEnd.toISOString() : null,
          };
        })
        .catch((err) => {
          console.log('error', err);
        });
    } catch (error) {
      console.log('Error: ', error);
    }
  },
  deleteFilm: async (_, args) => {
    const { slug } = args;
    const res = await FilmsCollection.findOneAndDelete({ slug })
      .populate('genres')
      .populate('director')
      .populate('actors');
    const film = transformSingleFilm(res);
    return film;
  },
  updateFilm: async (_, args) => {
    const { input } = args;
    const { slug, director, actors, genres } = input;
    const foundFilm = await FilmsCollection.findOne({ slug })
      .populate('genres')
      .populate('director')
      .populate('actors');

    // update director
    if (foundFilm._doc.director.id !== director) {
      await PersonCollection.updateOne({ _id: { $in: director } }, { $push: { directed: foundFilm.id } });
      await PersonCollection.updateOne(
        { _id: { $in: foundFilm._doc.director.id } },
        { $pull: { directed: foundFilm.id } },
      );
    }

    // update genres
    const genresIds = getUniqueIds(foundFilm._doc.genres, genres);
    await updateFilmInCollection(genresIds, GenresCollection, 'films', foundFilm.id, genres);

    //update actors
    const actorsIds = getUniqueIds(foundFilm._doc.actors, actors);
    await updateFilmInCollection(actorsIds, PersonCollection, 'acted', foundFilm.id, actors);

    // update film
    const res = await FilmsCollection.findOneAndUpdate(
      { _id: { $in: foundFilm.id } },
      { $set: { ...input } },
      { returnDocument: 'after' },
    )
      .populate('genres')
      .populate('director')
      .populate('actors');

    const film = transformSingleFilm(res);
    return film;
  },
};

module.exports = {
  Mutation,
};
