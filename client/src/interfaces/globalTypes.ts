/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum RolesEnum {
  Actor = "Actor",
  Director = "Director",
  Operator = "Operator",
  Producer = "Producer",
  Screenwriter = "Screenwriter",
}

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
