const { gql } = require('apollo-server');
const { Upload } = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type Film {
    id: ID!
    title: String!
    director: Person!
    genres: [Genre!]!
    year: String!
    rate: Float!
    description: String!
    slug: String!
    duration: Int!
    actors: [Person!]!
    image: String!
    tvShow: Boolean!
    yearEnd: String
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

  type AllFilms {
    films: [Film!]
    totalPages: Int
  }

  input SortBy {
    field: SortingField!
    order: Order!
  }

  input FilterBy {
    year: YearRange
    directors: [ID]
    genres: [ID]
    tvShow: Boolean
    rate: RateRange
  }

  input YearRange {
    min: Int!
    max: Int!
  }

  input RateRange {
    min: Float!
    max: Float!
  }

  enum SortingField {
    title
    year
    rate
    duration
  }

  enum Order {
    ASC
    DESC
  }

  type Query {
    films(sortBy: SortBy!, page: Int!, limit: Int!, filterBy: FilterBy): AllFilms!
    genres: [Genre!]!
    persons: [Person!]!
    filmsByGenre(slug: String!): [Film]!
    film(slug: String!): Film
    person(slug: String!): Person
    directors: [Person]!
  }

  input CreatePersonInput {
    name: String!
    birthDate: String!
    image: Upload!
    bio: String!
  }

  input CreateFilmInput {
    title: String!
    year: String!
    rate: Float!
    description: String!
    duration: Int!
    image: Upload!
    yearEnd: String
    tvShow: Boolean
    director: ID
    actors: [ID]
    genres: [ID]
  }

  input UpdateFilmInput {
    slug: String!
    title: String
    year: String
    rate: Float
    description: String
    duration: Int
    image: Upload
    yearEnd: String
    tvShow: Boolean
    director: ID
    actors: [ID]
    genres: [ID]
  }

  type Mutation {
    addPerson(input: CreatePersonInput!): Person!
    addFilm(input: CreateFilmInput!): Film!
    deleteFilm(slug: String!): Film!
    updateFilm(input: UpdateFilmInput!): Film!
  }
`;

module.exports = typeDefs;
