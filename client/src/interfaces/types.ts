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
  year: Date;
  tvShow: boolean;
  image: File[];
  director: string;
  actors: string[];
  genres: string[];
  yearEnd?: Date;
}

export interface INewPerson extends FormFieldsValues_persons {
  createWithName: string;
  newPerson: true;
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
