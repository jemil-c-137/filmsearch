/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFilmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddFilm
// ====================================================

export interface AddFilm_addFilm_genres {
  __typename: "Genre";
  name: string;
  id: string;
  slug: string;
}

export interface AddFilm_addFilm {
  __typename: "Film";
  id: string;
  title: string;
  tvShow: boolean;
  yearEnd: string | null;
  genres: AddFilm_addFilm_genres[];
  year: string;
  rate: number;
  slug: string;
  duration: number;
  image: string;
}

export interface AddFilm {
  addFilm: AddFilm_addFilm;
}

export interface AddFilmVariables {
  input: CreateFilmInput;
}
