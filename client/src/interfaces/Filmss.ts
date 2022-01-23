/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Films
// ====================================================

export interface Films_films_genres {
  __typename: "Genre";
  name: string;
  id: string;
  slug: string;
}

export interface Films_films {
  __typename: "Film";
  title: string;
  id: string;
  genres: Films_films_genres[];
  year: number;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface Films {
  films: Films_films[];
}
