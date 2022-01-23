import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PersonSelect from './PersonSelect';
import MultiplePersonSelect from './MultiplePersonSelect';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export const QUERY_PERSONS = gql`
  query GetAllPersons {
    persons {
      name
      id
    }
  }
`;

interface IPersonsFieldsProps {
  toggleOpen: (isOpen: boolean) => void;
}

const PersonsFields: React.FC<IPersonsFieldsProps> = ({ toggleOpen }) => {
  const { loading, data, error } = useQuery(QUERY_PERSONS);

  return (
    <div>
      {loading && <CircularProgress />}
      {data && (
        <Stack spacing={3}>
          <PersonSelect toggleOpen={toggleOpen} persons={data.persons} />
          <MultiplePersonSelect toggleOpen={toggleOpen} persons={data.persons} />
        </Stack>
      )}
    </div>
  );
};

export default PersonsFields;
