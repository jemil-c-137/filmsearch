/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Person
// ====================================================

export interface Person_person_acted {
  __typename: "Film";
  title: string;
  id: string;
  slug: string;
}

export interface Person_person_directed {
  __typename: "Film";
  title: string;
  id: string;
  slug: string;
}

export interface Person_person {
  __typename: "Person";
  name: string;
  birthDate: string;
  image: string;
  bio: string;
  acted: (Person_person_acted | null)[];
  directed: (Person_person_directed | null)[];
}

export interface Person {
  person: Person_person | null;
}

export interface PersonVariables {
  id: string;
}
