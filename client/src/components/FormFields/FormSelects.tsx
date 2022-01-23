import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PersonSelect from './PersonSelect';
import MultiplePersonSelect from './MultiplePersonSelect';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { FormFieldsValues } from '../../interfaces/FormFieldsValues';
import GenreField from './GenresFields';

export const QUERY_FORM_SELECTS = gql`
  query FormFieldsValues {
    persons {
      name
      id
    }
    genres {
      name
      id
    }
  }
`;

interface IPersonsFieldsProps {
  toggleOpen: (isOpen: boolean) => void;
  addGenres: (genres: string[]) => void;
  addActors: (actors: string[]) => void;
  addDirector: (director: string) => void;
}

const FormSelects: React.FC<IPersonsFieldsProps> = ({ toggleOpen, addGenres, addActors, addDirector }) => {
  const { loading, data, error } = useQuery<FormFieldsValues>(QUERY_FORM_SELECTS);

  return (
    <div>
      {loading && <CircularProgress />}
      {data && (
        <Stack spacing={3}>
          <GenreField genres={data.genres} addGenres={addGenres} />
          <PersonSelect toggleOpen={toggleOpen} persons={data.persons} addDirector={addDirector} />
          <MultiplePersonSelect toggleOpen={toggleOpen} persons={data.persons} addActors={addActors} />
        </Stack>
      )}
    </div>
  );
};

export default FormSelects;
