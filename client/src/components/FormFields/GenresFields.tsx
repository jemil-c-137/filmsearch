import React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FormFieldsValues_genres } from '../../interfaces/FormFieldsValues';

const filter = createFilterOptions<FormFieldsValues_genres>();

interface IPersonSelectProps {
  genres: FormFieldsValues_genres[];
}

const GenreField: React.FC<IPersonSelectProps> = ({ genres }) => {
  const [value, setValue] = React.useState<FormFieldsValues_genres[]>([]);

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={genres}
        value={value}
        onChange={(_, newValue) => {
          if (newValue.length === 0) return setValue([]);

          setValue(newValue);
        }}
        filterOptions={(options, params) => filter(options, params)}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => {
          return <TextField {...params} label="Genre" />;
        }}
      />
    </React.Fragment>
  );
};

export default GenreField;
