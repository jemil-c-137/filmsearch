/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFilmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddFilm
// ====================================================

export interface AddFilm_addFilm {
  __typename: "Success";
  isSuccess: any | null;
}

export interface AddFilm {
  addFilm: AddFilm_addFilm;
}

export interface AddFilmVariables {
  input?: CreateFilmInput | null;
}
