/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Film
// ====================================================

export interface Film_film_genres {
  __typename: "Genre";
  name: string;
  slug: string;
  id: string;
}

export interface Film_film_director {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface Film_film_actors {
  __typename: "Person";
  name: string;
  slug: string;
  image: string;
  id: string;
}

export interface Film_film {
  __typename: "Film";
  id: string;
  title: string;
  year: string;
  description: string;
  rate: number;
  duration: number;
  image: string;
  slug: string;
  genres: Film_film_genres[];
  director: Film_film_director;
  actors: Film_film_actors[];
  tvShow: boolean;
  yearEnd: string | null;
}

export interface Film {
  film: Film_film | null;
}

export interface FilmVariables {
  slug: string;
}
