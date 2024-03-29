import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { FormFieldsValues_persons } from '../../interfaces/FormFieldsValues';
import { hasOwnProperty } from '../../utils/helpers/typeguards';
import { INewPerson } from '../../interfaces/types';
import { Film_film_director } from '../../interfaces/Film';

const filter = createFilterOptions<FormFieldsValues_persons | INewPerson | string>();

interface IPersonSelectProps {
  toggleOpen: (isOpen: boolean, name: string) => void;
  persons: FormFieldsValues_persons[];
  addDirector: (director: string) => void;
  defaultValue: Film_film_director;
}

const PersonSelect: React.FC<IPersonSelectProps> = ({ toggleOpen, persons, addDirector, defaultValue }) => {
  const [value, setValue] = React.useState<FormFieldsValues_persons | null>(defaultValue);

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(_, newValue: FormFieldsValues_persons | INewPerson | string | null) => {
          if (newValue === null) return;
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true, newValue);
            });
          } else if (typeof newValue === 'object' && hasOwnProperty(newValue, 'newPerson')) {
            toggleOpen(true, (newValue as INewPerson).createWithName);
          } else {
            addDirector(newValue.id);
            setValue(newValue);
          }
        }}
        filterOptions={(options: (FormFieldsValues_persons | INewPerson | string)[], params) => {
          const filtered = filter(options, params);

          const newPerson: INewPerson = {
            createWithName: params.inputValue,
            name: `Add "${params.inputValue}"`,
            __typename: 'Person',
            id: 'newPerson',
            newPerson: true,
          };

          if (params.inputValue !== '') {
            filtered.push(newPerson);
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={persons || ['No persons']}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          if (typeof option === 'string') return null;
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Director" />}
      />
    </React.Fragment>
  );
};

export default PersonSelect;
