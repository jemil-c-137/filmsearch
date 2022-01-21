import React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { IPersonSelect } from './MultiplePersonSelect';

const filter = createFilterOptions<IPersonSelect>();

interface IPersonSelectProps {
  toggleOpen: (isOpen: boolean) => void;
  persons: any[];
}

const PersonSelect: React.FC<IPersonSelectProps> = ({ toggleOpen, persons }) => {
  const [value, setValue] = React.useState<IPersonSelect | null>(null);

  const [dialogValue, setDialogValue] = React.useState<IPersonSelect>({
    name: '',
    birthDate: new Date(),
    bio: '',
  });

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log('newvalue', newValue);
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                bio: '',
                birthDate: new Date(),
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
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
        id="free-solo-dialog-demo"
        options={persons || ['No persons']}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Director" />}
      />
    </React.Fragment>
  );
};

export default PersonSelect;
