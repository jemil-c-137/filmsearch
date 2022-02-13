import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';

import { QUERY_FORM_SELECTS } from './FormFields/FormSelects';
import { TToggleCreatePerson } from './AddFilmForm';
import { PersonOptionType } from '../interfaces/types';

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
  birthDate: new Date(),
  bio: '',
};

interface IAddPersonFormProps {
  toggle: TToggleCreatePerson;
  handleClose: () => void;
}

const AddPersonForm: React.FC<IAddPersonFormProps> = ({ toggle, handleClose }) => {
  const { open, name } = toggle;
  const def = { ...defaultValues, name };
  const {
    handleSubmit,
    control,
    register,
    formState: { isValid },
  } = useForm<PersonOptionType>({
    defaultValues: def,
    mode: 'onChange',
  });


  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: QUERY_FORM_SELECTS }],
  });

  const onSubmit = (data: PersonOptionType) => {
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
        <DialogTitle>Add a new person</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>Didn't find who you were looking for? Please, add them!</DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
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
                    <>
                      <TextField
                        helperText={error ? error.message : null}
                        autoFocus
                        fullWidth
                        error={!!error}
                        margin="dense"
                        value={value}
                        onChange={onChange}
                        label="Name"
                        type="text"
                        variant="standard"
                      />
                    </>
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birth date"
                      value={value}
                      onChange={onChange}
                      disableFuture
                      mask="__/__/____"
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                type="file"
                multiple={true}
                {...register('image', { required: { value: true, message: 'please provide a image of the person' } })}
              />
            </Grid>
            <Grid item xs={12}>
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
                    error={!!error}
                    margin="dense"
                    fullWidth
                    minRows={4}
                    value={value}
                    onChange={onChange}
                    label="Bio"
                    type="text"
                    variant="standard"
                    multiline
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!isValid} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPersonForm;
