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
  director: TPerson;
}

export type TPerson = Omit<PersonOptionType, 'inputValue'>;
