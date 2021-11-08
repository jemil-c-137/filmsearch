const { gql } = require('apollo-server');

const typeDefs = gql`
  type Film {
    id: ID!
    title: String!
    director: Person!
    genre: [Genre!]!
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
    age: Int!
    image: String!
    slug: String!
    bio: String
    films: [CrewMember]!
  }

  type Roles {
    person: Person
    role: RolesEnum
  }

  type CrewMember {
    film: Film
    role: RolesEnum
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
    film(slug: String!): Film
    actor(slug: String!): Actor
    director(slug: String!): Director
    person(slug: String!): Person
  }
`;

module.exports = typeDefs;
