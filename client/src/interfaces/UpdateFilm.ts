/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateFilmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFilm
// ====================================================

export interface UpdateFilm_updateFilm_genres {
  __typename: "Genre";
  name: string;
  slug: string;
  id: string;
}

export interface UpdateFilm_updateFilm_director {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface UpdateFilm_updateFilm_actors {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface UpdateFilm_updateFilm {
  __typename: "Film";
  id: string;
  title: string;
  year: string;
  description: string;
  rate: number;
  duration: number;
  image: string;
  slug: string;
  genres: UpdateFilm_updateFilm_genres[];
  director: UpdateFilm_updateFilm_director;
  actors: UpdateFilm_updateFilm_actors[];
  tvShow: boolean;
  yearEnd: string | null;
}

export interface UpdateFilm {
  updateFilm: UpdateFilm_updateFilm;
}

export interface UpdateFilmVariables {
  input: UpdateFilmInput;
}
