import React from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TPerson } from '../interfaces/types';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { QUERY_FORM_SELECTS } from './FormFields/FormSelects';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ADD_PERSON = gql`
  mutation AddPerson($input: CreatePersonInput!) {
    addPerson(input: $input) {
      bio
      slug
      image
      birthDate
      name
      id
    }
  }
`;

const defaultValues = {
  name: '',
  birthDate: new Date(),
  bio: '',
};

interface IAddPersonFormProps {
  open: boolean;
  handleClose: () => void;
}

const AddPersonForm: React.FC<IAddPersonFormProps> = ({ open, handleClose }) => {
  const { handleSubmit, control, register } = useForm<TPerson>({ defaultValues });

  const [addPerson, { data, loading, error }] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: QUERY_FORM_SELECTS }],
  });

  const onSubmit = (data: TPerson) => {
    const date = data.birthDate.toISOString();
    const file = data.image[0];

    const payload = {
      ...data,
      image: file,
      birthDate: date,
    };

    addPerson({ variables: { input: payload } })
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add a new director</DialogTitle>
        <DialogContent>
          <DialogContentText>Didn't find who you were looking for? Please, add them!</DialogContentText>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please enter name',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                autoFocus
                error={!!error}
                margin="dense"
                value={value}
                onChange={onChange}
                label="Name"
                type="text"
                variant="standard"
              />
            )}
          />
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birth date"
                  value={value}
                  onChange={onChange}
                  maxDate={new Date()}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="bio"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please enter bio',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                autoFocus
                error={!!error}n
                margin="dense"
                value={value}
                onChange={onChange}
                label="Bio"
                type="text"
                variant="standard"
                multiline
              />
            )}
          />
          <input type="file" multiple={true} {...register('image')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPersonForm;
