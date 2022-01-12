/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFilmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_addFilm {
  __typename: "Success";
  isSuccess: any | null;
}

export interface Mutation {
  addFilm: Mutation_addFilm;
}

export interface MutationVariables {
  input?: CreateFilmInput | null;
}
