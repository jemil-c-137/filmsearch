import { FormFieldsValues_genres } from "./FormFieldsValues";


export interface PersonOptionType {
  name: string;
  image: File[];
  birthDate: Date;
  bio: string;
  inputValue?: string;
}

export interface IForm {
  title: string;
  duration: string;
  description: string;
  rate: string;
  tvShow: boolean;
  year: Date;
  image: File[];
  director: string;
  actors: string[];
  genres: string[];
}

export type TPerson = Omit<PersonOptionType, 'inputValue'>;
