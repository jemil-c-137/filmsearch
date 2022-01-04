import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { IFormInputTextProps } from './FormInputText';

const options = [
  { label: 'Radio 1', value: '1' },
  { label: 'Radio 2', value: '2' },
];

const FormInputRadio: React.FC<IFormInputTextProps> = ({ name, control, label }) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel value={singleOption.value} label={singleOption.label} control={<Radio />} />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
};

export default FormInputRadio;
