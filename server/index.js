const { ApolloServer, gql } = require('apollo-server');
const { Query } = require('./resolvers/Query');
const { Director } = require('./resolvers/Director');
const { Actor } = require('./resolvers/Actors');
const { Genre } = require('./resolvers/Genres');
const { Film } = require('./resolvers/Films');
const { Person} = require('./resolvers/Person');
const { Mutation } = require('./resolvers/Mutation');
const { genres, actors, directors, films, persons, RolesEnum } = require('./db');
const typeDefs = require('./Schema');
const mongoose = require('mongoose');
const { PersonCollection } = require('./model');

const resolvers = {
  Query,
  Director,
  Actor,
  Genre,
  Film,
  Person,
  Mutation,
};

const context = {
  films,
  directors,
  genres,
  actors,
  persons,
  RolesEnum,
  PersonCollection
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context });
// The `listen` method launches a web server.

mongoose
  .connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.gglqd.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
  )
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch(() => {
    console.log('Error while connecting to MongoDb');
  });
