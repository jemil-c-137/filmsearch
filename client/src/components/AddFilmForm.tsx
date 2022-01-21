import { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { FormInputText, Modal } from '../elements';
import Rating from '@mui/material/Rating';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Stack from '@mui/material/Stack';
import { gql, useMutation } from '@apollo/client';
import { IForm } from '../interfaces/types';
import AddPersonForm from './AddPersonForm';
import PersonsFields from './PersonsFields/PersonsFields';

const defaultValues = {
  title: '',
  duration: '',
  description: '',
  rate: '',
  tvShow: false,
  year: new Date(),
  image: undefined,
};

const TEST_MUTATION = gql`
  mutation Mutation($input: CreateFilmInput) {
    addFilm(input: $input) {
      isSuccess
    }
  }
`;


const AddFilmForm = () => {
  const { handleSubmit, control, register } = useForm<IForm>({ defaultValues });

  const [openPersonDialog, toggleOpenPersonDialog] = useState(false);

  const [addFilm, { data, loading, error }] = useMutation(TEST_MUTATION);

  const onSubmit = async (data: IForm) => {

    const file = data.image[0];


    const payload = {
      ...data,
      duration: parseInt(data.duration),
      rate: parseFloat(data.rate),
      year: data.year.getFullYear(),
      image: file,
    };
    addFilm({ variables: { input: payload } })
      .then((res) => console.log('response success', res))
      .catch((res) => console.log('response error', res));
  };

  const closePersonForm = () => toggleOpenPersonDialog(false);

  return (
    <Paper>
      <Typography variant="h6"> Form Demo </Typography>

      <Modal btnText="add film" modalTitle="Add a movie">
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter a movie title',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label="Movie title"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="duration"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter a movie duration in minutes',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <TextField
                  helperText={error ? error.message : null}
                  type="number"
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label={'Duration (in min.)'}
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter a movie description',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  multiline
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label={'Movie description'}
                  variant="outlined"
                />
              )}
            />
            <Stack spacing={1}>
              <Typography component="legend">Rate</Typography>
              <Controller
                name="rate"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <Rating
                    name="rate"
                    onChange={onChange}
                    value={Number(value)}
                    defaultValue={2.5}
                    precision={0.5}
                    max={10}
                  />
                )}
              />
            </Stack>
            <Controller
              name="tvShow"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={onChange} value={value} />} label="TV Show" />
                </FormGroup>
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year']}
                    label="Release year"
                    value={value}
                    onChange={onChange}
                    maxDate={new Date()}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              )}
            />

            <input type="file" multiple={true} {...register('image')} />

            <PersonsFields toggleOpen={toggleOpenPersonDialog} />
          </Stack>
          <Button color="secondary" type="submit" variant="contained">
            Save
          </Button>
        </form>
        <AddPersonForm open={openPersonDialog} handleClose={closePersonForm} />
      </Modal>
    </Paper>
  );
};

export default AddFilmForm;
