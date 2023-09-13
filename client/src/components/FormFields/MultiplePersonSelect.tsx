import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { INewPerson } from '../../interfaces/types';
import { FormFieldsValues_persons } from '../../interfaces/FormFieldsValues';
import { hasOwnProperty } from '../../utils/helpers/typeguards';
import { Film_film_actors } from '../../interfaces/Film';

const filter = createFilterOptions<INewPerson | FormFieldsValues_persons>();

interface IPersonSelectProps {
  toggleOpen: (isOpen: boolean, name: string) => void;
  persons: FormFieldsValues_persons[];
  addActors: (actors: string[]) => void;
  defaultValues: Film_film_actors[];
}

const MultiplePersonSelect: React.FC<IPersonSelectProps> = ({ toggleOpen, persons, addActors, defaultValues }) => {
  const [value, setValue] = React.useState<(FormFieldsValues_persons | INewPerson)[]>(defaultValues);

  const setActors = (actors: (FormFieldsValues_persons | INewPerson)[]) => {
    const actorsIds = actors.reduce((prev, current) => {
      if (!hasOwnProperty(current, 'newPerson')) {
        return [...prev, current.id];
      } else {
        return prev;
      }
    }, [] as string[]);
    addActors(actorsIds);
  };

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={persons}
        value={value}
        onChange={(_, newValue) => {
          if (newValue.length === 0) return setValue([]);
          const lastElement = newValue[newValue.length - 1];

          if (hasOwnProperty(lastElement, 'createWithName')) {
            toggleOpen(true, (lastElement as INewPerson).createWithName || '');
          } else {
            setActors(newValue);
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              createWithName: params.inputValue,
              name: `Add "${params.inputValue}"`,
              newPerson: true,
              id: 'new person',
              __typename: 'Person',
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => {
          return <TextField {...params} label="Actors" />;
        }}
      />
    </React.Fragment>
  );
};

export default MultiplePersonSelect;
