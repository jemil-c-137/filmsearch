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
  slug: string;
  id: string;
}

export interface NewFilm_director {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface NewFilm_actors {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface NewFilm {
  __typename: "Film";
  id: string;
  title: string;
  year: string;
  description: string;
  rate: number;
  duration: number;
  image: string;
  slug: string;
  genres: NewFilm_genres[];
  director: NewFilm_director;
  actors: NewFilm_actors[];
  tvShow: boolean;
  yearEnd: string | null;
}
