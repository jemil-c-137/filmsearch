/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RolesEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: Person
// ====================================================

export interface Person_person_films_film {
  __typename: "Film";
  title: string;
  slug: string;
  id: string;
}

export interface Person_person_films {
  __typename: "CrewMember";
  film: Person_person_films_film;
  role: RolesEnum;
}

export interface Person_person {
  __typename: "Person";
  name: string;
  birthDate: string;
  image: string;
  bio: string;
  films: Person_person_films[] | null;
}

export interface Person {
  person: Person_person | null;
}

export interface PersonVariables {
  slug: string;
}
