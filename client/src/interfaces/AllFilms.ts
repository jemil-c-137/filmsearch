/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllFilms
// ====================================================

export interface AllFilms_films_genres {
  __typename: "Genre";
  name: string;
  id: string;
  slug: string;
}

export interface AllFilms_films {
  __typename: "Film";
  title: string;
  id: string;
  genres: AllFilms_films_genres[];
  year: string;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface AllFilms {
  films: AllFilms_films[];
}
