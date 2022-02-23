/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFilm
// ====================================================

export interface DeleteFilm_deleteFilm_genres {
  __typename: "Genre";
  name: string;
  id: string;
  slug: string;
}

export interface DeleteFilm_deleteFilm {
  __typename: "Film";
  id: string;
  title: string;
  tvShow: boolean;
  yearEnd: string | null;
  genres: DeleteFilm_deleteFilm_genres[];
  year: string;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface DeleteFilm {
  deleteFilm: DeleteFilm_deleteFilm;
}

export interface DeleteFilmVariables {
  slug: string;
}
