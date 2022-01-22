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
}

const FormSelects: React.FC<IPersonsFieldsProps> = ({ toggleOpen }) => {
  const { loading, data, error } = useQuery<FormFieldsValues>(QUERY_FORM_SELECTS);

  return (
    <div>
      {loading && <CircularProgress />}
      {data && (
        <Stack spacing={3}>
          <GenreField genres={data.genres} />
          <PersonSelect toggleOpen={toggleOpen} persons={data.persons} />
          <MultiplePersonSelect toggleOpen={toggleOpen} persons={data.persons} />
        </Stack>
      )}
    </div>
  );
};

export default FormSelects;
