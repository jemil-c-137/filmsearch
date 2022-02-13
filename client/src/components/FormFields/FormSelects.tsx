import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import PersonSelect from './PersonSelect';
import MultiplePersonSelect from './MultiplePersonSelect';

import { FormFieldsValues } from '../../interfaces/FormFieldsValues';
import GenreField from './GenresFields';
import { Film_film_actors, Film_film_director, Film_film_genres } from '../../interfaces/Film';

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
  toggleOpen: (open: boolean, name: string) => void;
  addGenres: (genres: string[]) => void;
  addActors: (actors: string[]) => void;
  addDirector: (director: string) => void;
  defaultValues: {
    genres: Film_film_genres[];
    director: Film_film_director;
    actors: Film_film_actors[];
  };
}

const FormSelects: React.FC<IPersonsFieldsProps> = ({
  toggleOpen,
  addGenres,
  addActors,
  addDirector,
  defaultValues,
}) => {
  const { loading, data } = useQuery<FormFieldsValues>(QUERY_FORM_SELECTS);

  const { actors, director, genres } = defaultValues;

  return (
    <div>
      {loading && <CircularProgress />}
      {data && (
        <Stack spacing={3}>
          <GenreField genres={data.genres} addGenres={addGenres} defaultValues={genres} />
          <PersonSelect
            toggleOpen={toggleOpen}
            persons={data.persons}
            addDirector={addDirector}
            defaultValue={director}
          />
          <MultiplePersonSelect
            toggleOpen={toggleOpen}
            persons={data.persons}
            addActors={addActors}
            defaultValues={actors}
          />
        </Stack>
      )}
    </div>
  );
};

export default FormSelects;
