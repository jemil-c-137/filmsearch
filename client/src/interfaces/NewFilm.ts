/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewFilm
// ====================================================

export interface NewFilm_genres {
  __typename: "Genre";
  name: string;
  id: string;
  slug: string;
}

export interface NewFilm {
  __typename: "Film";
  id: string;
  title: string;
  tvShow: boolean;
  yearEnd: string | null;
  genres: NewFilm_genres[];
  year: string;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}
