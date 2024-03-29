/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SortingField {
  duration = "duration",
  rate = "rate",
  title = "title",
  year = "year",
}

export interface CreateFilmInput {
  title: string;
  year: string;
  rate: number;
  description: string;
  duration: number;
  image: any;
  yearEnd?: string | null;
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

export interface FilterBy {
  year?: YearRange | null;
  directors?: (string | null)[] | null;
  genres?: (string | null)[] | null;
  tvShow?: boolean | null;
  rate?: RateRange | null;
}

export interface RateRange {
  min: number;
  max: number;
}

export interface SortBy {
  field: SortingField;
  order: Order;
}

export interface UpdateFilmInput {
  slug: string;
  title?: string | null;
  year?: string | null;
  rate?: number | null;
  description?: string | null;
  duration?: number | null;
  image?: any | null;
  yearEnd?: string | null;
  tvShow?: boolean | null;
  director?: string | null;
  actors?: (string | null)[] | null;
  genres?: (string | null)[] | null;
}

export interface YearRange {
  min: number;
  max: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
