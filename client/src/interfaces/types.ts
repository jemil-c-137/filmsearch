import { FormFieldsValues_persons } from './FormFieldsValues';

export interface PersonOptionType {
  name: string;
  image: File[];
  birthDate: Date;
  bio: string;
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

export interface INewPerson extends FormFieldsValues_persons {
  createWithName: string;
  newPerson: true;
}
