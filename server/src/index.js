const express = require('express');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');
const mongoose = require('mongoose');

const { Query } = require('./graphql/queries/queries');
const { Film } = require('./graphql/queries/film');
const { Person } = require('./graphql/queries/person');
const { Mutation } = require('./graphql/mutations/mutations');
const typeDefs = require('./graphql/typedefs/schema');
const { PersonCollection } = require('./data/models/person');

const resolvers = {
  Query,
  Film,
  Person,
  Mutation,
};

const context = {
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
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@${process.env.mongoCluster}/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
  );

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
