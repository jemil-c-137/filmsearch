import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { IFormInputTextProps } from './FormInputText';

const options = [
  {
    label: 'Dropdown Option 1',
    value: '1',
  },
  {
    label: 'Dropdown Option 2',
    value: '2',
  },
];

export const FormInputDropdown: React.FC<IFormInputTextProps> = ({ name, control, label }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
      )}
    />
  );
};
