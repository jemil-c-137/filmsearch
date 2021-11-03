/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FILMS
// ====================================================

export interface FILMS_films_genre {
  __typename: "Genre";
  name: string;
  id: string;
}

export interface FILMS_films {
  __typename: "Film";
  title: string;
  id: string;
  genre: FILMS_films_genre[];
  year: number;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface FILMS {
  films: FILMS_films[];
}
