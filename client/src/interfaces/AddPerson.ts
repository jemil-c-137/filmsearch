/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePersonInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddPerson
// ====================================================

export interface AddPerson_addPerson {
  __typename: "Person";
  bio: string;
  slug: string;
  image: string;
  birthDate: string;
  name: string;
  id: string;
}

export interface AddPerson {
  addPerson: AddPerson_addPerson;
}

export interface AddPersonVariables {
  input: CreatePersonInput;
}
