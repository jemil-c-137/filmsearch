import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';
import React from 'react';
import { StandardTextFieldProps } from '@mui/material';

export interface IFormInputTextProps extends StandardTextFieldProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  maxLength?: number;
  //fieldProps: StandardTextFieldProps
}

export const FormInputText: React.FC<IFormInputTextProps> = ({ name, label, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};
