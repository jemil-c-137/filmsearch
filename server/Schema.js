const { gql } = require('apollo-server');

const typeDefs = gql`
  type Film {
    id: ID!
    title: String!
    director: Director!
    genre: [Genre!]!
    year: Int!
    rate: Float!
    description: String!
    slug: String!
    duration: Int!
    actors: [Actor!]!
    image: String!
    yearEnd: Int
    tvShow: Boolean
    featured: Boolean
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
    films: [Film]
    directors: [Director]
    genres: [Genre]
    actors: [Actor]
    film(slug: String!): Film
    actor(slug: String!): Actor
    director(slug: String!): Director
  }
`;

module.exports = typeDefs;
