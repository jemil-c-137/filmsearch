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
    crew: [Roles]
  }

  type Director {
    id: ID!
    name: String!
    age: Int!
    films: [Film!]!
    image: String!
    slug: String!
    bio: String
  }

  type Genre {
    id: ID!
    name: String!
    slug: String!
    films: [Film!]!
  }

  type Actor {
    id: ID!
    name: String!
    age: Int!
    films: [Film!]!
    image: String!
    slug: String!
    bio: String
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

  type Roles {
    person: Person
    role: RolesEnum
  }

  type CrewMember {
    film: Film!
    role: RolesEnum!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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

  enum RolesEnum {
    Director
    Actor
    Producer
    Operator
    Screenwriter
  }

  type Query {
    films: [Film!]!
    directors: [Director!]!
    genres: [Genre!]!
    actors: [Actor!]!
    persons: [Person!]!
    film(id: ID!): Film
    actor(slug: String!): Actor
    director(slug: String!): Director
    person(id: ID!): Person
    uploads: [File]
  }

  input CreatePersonInput {
    name: String!
    birthDate: String!
    image: Upload!
    bio: String!
  }

  type Success {
    isSuccess: Upload
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
    addPerson(input: CreatePersonInput!): Person
    addFilm(input: CreateFilmInput): Success!
    addGenre(name: String): Success
    testMutation(text: String): String
    fileUpload(file: Upload!): Success
  }
`;

module.exports = typeDefs;
