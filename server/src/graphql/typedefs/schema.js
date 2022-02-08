const { gql } = require('apollo-server');
const { Upload } = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type Film {
    id: ID!
    title: String!
    director: Person!
    genres: [Genre!]!
    year: Int!
    rate: Float!
    description: String!
    slug: String!
    duration: Int!
    actors: [Person!]!
    image: String!
    yearEnd: Int
    tvShow: Boolean
    featured: Boolean
  }

  type Genre {
    id: ID!
    name: String!
    slug: String!
    films: [Film!]!
  }

  type Person {
    id: ID!
    name: String!
    birthDate: String!
    image: String!
    slug: String!
    bio: String!
    directed: [Film]!
    acted: [Film]!
  }

  input FilmOrder {
    description: Sort
    title: Sort
    year: Sort
  }

  enum Sort {
    asc
    desc
  }

  type Query {
    films: [Film!]!
    genres: [Genre!]!
    persons: [Person!]!
    filmsByGenre(slug: String!): [Film]!
    film(slug: String!): Film
    person(slug: String!): Person
  }

  input CreatePersonInput {
    name: String!
    birthDate: String!
    image: Upload!
    bio: String!
  }

  input CreateFilmInput {
    title: String!
    year: Int!
    rate: Float!
    description: String!
    duration: Int!
    image: Upload!
    yearEnd: Int
    tvShow: Boolean
    director: ID
    actors: [ID]
    genres: [ID]
  }

  type Mutation {
    addPerson(input: CreatePersonInput!): Person!
    addFilm(input: CreateFilmInput): Film!
    deleteFilm(slug: String!): Boolean!
  }
`;

module.exports = typeDefs;
