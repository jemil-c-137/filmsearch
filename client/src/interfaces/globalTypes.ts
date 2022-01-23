/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateFilmInput {
  title: string;
  year: number;
  rate: number;
  description: string;
  duration: number;
  image: any;
  yearEnd?: number | null;
  tvShow?: boolean | null;
  director?: string | null;
  actors?: (string | null)[] | null;
  genres?: (string | null)[] | null;
}

export interface CreatePersonInput {
  name: string;
  birthDate: string;
  image: any;
  bio: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
