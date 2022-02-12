/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilmsByGenre
// ====================================================

export interface FilmsByGenre_filmsByGenre_genres {
  __typename: "Genre";
  id: string;
  name: string;
  slug: string;
}

export interface FilmsByGenre_filmsByGenre {
  __typename: "Film";
  title: string;
  rate: number;
  year: string;
  image: string;
  duration: number;
  tvShow: boolean | null;
  yearEnd: string | null;
  slug: string;
  id: string;
  genres: FilmsByGenre_filmsByGenre_genres[];
}

export interface FilmsByGenre {
  filmsByGenre: (FilmsByGenre_filmsByGenre | null)[];
}

export interface FilmsByGenreVariables {
  slug: string;
}
