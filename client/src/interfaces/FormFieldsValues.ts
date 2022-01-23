/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FormFieldsValues
// ====================================================

export interface FormFieldsValues_persons {
  __typename: "Person";
  name: string;
  id: string;
}

export interface FormFieldsValues_genres {
  __typename: "Genre";
  name: string;
  id: string;
}

export interface FormFieldsValues {
  persons: FormFieldsValues_persons[];
  genres: FormFieldsValues_genres[];
}
