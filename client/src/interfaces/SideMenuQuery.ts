/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SideMenuQuery
// ====================================================

export interface SideMenuQuery_genres {
  __typename: "Genre";
  slug: string;
  name: string;
  id: string;
}

export interface SideMenuQuery_directors {
  __typename: "Person";
  slug: string;
  name: string;
  id: string;
  image: string;
}

export interface SideMenuQuery {
  genres: SideMenuQuery_genres[];
  directors: (SideMenuQuery_directors | null)[];
}
