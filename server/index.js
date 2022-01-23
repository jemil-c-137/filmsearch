const express = require('express');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');
const { Query } = require('./resolvers/Query');
const { Director } = require('./resolvers/Director');
const { Actor } = require('./resolvers/Actors');
const { Genre } = require('./resolvers/Genres');
const { Film } = require('./resolvers/Films');
const { Person } = require('./resolvers/Person');
const { Mutation } = require('./resolvers/Mutation');
const { genres, actors, directors, films, persons, RolesEnum } = require('./db');
const typeDefs = require('./Schema');
const mongoose = require('mongoose');
const { PersonCollection } = require('./models/Persons');

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
  PersonCollection,
};

async function startServer() {
  dotenv.config();

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  const app = express();

  app.use(graphqlUploadExpress());

  app.use(cors());

  server.applyMiddleware({ app, cors: true });

  await mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.gglqd.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
  );

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
