/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: I
// ====================================================

export interface I_films_genre {
  __typename: "Genre";
  name: string;
}

export interface I_films {
  __typename: "Film";
  title: string;
  id: string;
  genre: I_films_genre[];
  year: number;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface I {
  films: (I_films | null)[] | null;
}
