import React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { PersonOptionType } from '../../interfaces/types';
import { FormFieldsValues_persons } from '../../interfaces/FormFieldsValues';

export type IPersonSelect = Omit<PersonOptionType, 'image'>;

const filter = createFilterOptions<IPersonSelect | FormFieldsValues_persons>();

interface IPersonSelectProps {
  toggleOpen: (isOpen: boolean) => void;
  persons: FormFieldsValues_persons[];
}

const MultiplePersonSelect: React.FC<IPersonSelectProps> = ({ toggleOpen, persons }) => {
  const [value, setValue] = React.useState<(FormFieldsValues_persons | IPersonSelect)[]>([]);

  const isExistingPersonTypeGuard = (obj: FormFieldsValues_persons | IPersonSelect): obj is PersonOptionType => {
    return (obj as FormFieldsValues_persons).id === undefined;
  };

  const [dialogValue, setDialogValue] = React.useState<IPersonSelect>({
    name: '',
    birthDate: new Date(),
    bio: '',
  });

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={persons}
        value={value}
        onChange={(event, newValue) => {
          if (newValue.length === 0) return setValue([]);
          const lastElement = newValue[newValue.length - 1];

          if (isExistingPersonTypeGuard(lastElement)) {
            toggleOpen(true);
            setDialogValue({
              name: lastElement.inputValue || '',
              birthDate: new Date(),
              bio: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
              birthDate: new Date(),
              bio: '',
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => {
          console.log(params, 'params');
          return <TextField {...params} label="Actors" />;
        }}
      />
    </React.Fragment>
  );
};

export default MultiplePersonSelect;
