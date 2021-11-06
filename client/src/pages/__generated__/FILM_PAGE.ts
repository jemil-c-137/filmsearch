/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FILM_PAGE
// ====================================================

export interface FILM_PAGE_film_genre {
  __typename: "Genre";
  name: string;
  slug: string;
  id: string;
}

export interface FILM_PAGE_film_director {
  __typename: "Director";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface FILM_PAGE_film_actors {
  __typename: "Actor";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface FILM_PAGE_film {
  __typename: "Film";
  title: string;
  year: number;
  description: string;
  rate: number;
  duration: number;
  image: string;
  genre: FILM_PAGE_film_genre[];
  director: FILM_PAGE_film_director;
  actors: FILM_PAGE_film_actors[];
  tvShow: boolean | null;
  yearEnd: number | null;
}

export interface FILM_PAGE {
  film: FILM_PAGE_film | null;
}

export interface FILM_PAGEVariables {
  slug: string;
}
