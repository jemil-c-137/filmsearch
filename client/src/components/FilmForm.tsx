import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Rating from '@mui/material/Rating';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

import { Film_film } from '../interfaces/Film';
import AddPersonForm from './AddPersonForm';
import FormSelects from './FormFields/FormSelects';
import Button from '@mui/material/Button';
import { CreateFilmInput } from '../interfaces/globalTypes';
import { UpdatedFilm } from './EditFilmForm';

const StyledLabel = styled('label')(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  padding: '1rem 0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface FilmFormValue extends Film_film {
  imageInput: FileList;
  yearInput: Date;
  yearEndInput: Date;
  durationInput: string;
  rateInput: string;
  stillRunning: boolean;
}

interface IFormProps {
  film: Film_film;
  mode: 'update' | 'create';
  createFilm?: (data: CreateFilmInput) => Promise<void>;
  updateFilm?: (data: UpdatedFilm) => Promise<void>;
  loading: boolean;
}

export type TToggleCreatePerson = { open: boolean; name: string };

const FilmForm: React.FC<IFormProps> = ({ film, createFilm, updateFilm, mode, loading }) => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { isValid },
  } = useForm<FilmFormValue>({
    defaultValues: { ...film, stillRunning: film.tvShow && film.yearEnd ? false : true },
    mode: 'onChange',
  });

  const defaultValues = {
    genres: film.genres,
    director: film.director,
    actors: film.actors,
  };

  const yearValue = film.year ? new Date(film.year) : new Date();
  const yearEndValue = film.yearEnd ? new Date(film.yearEnd) : new Date();

  const isTvShow = watch('tvShow', film.tvShow);
  const releaseYear = watch('yearInput');
  const stillRunning = watch('stillRunning', true);

  const genres = film.genres.map((genre) => genre.id);
  const actors = film.actors.map((genre) => genre.id);

  const [openPersonDialog, toggleOpenPersonDialog] = useState<TToggleCreatePerson>({ open: false, name: '' });
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genres);
  const [selectedActors, setSelectedActors] = useState<string[]>(actors);
  const [selectedDirector, setSelectedDirector] = useState(film.director.id);

  const handleSelectGenre = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleSelectActors = (actors: string[]) => {
    setSelectedActors(actors);
  };

  const handleSelectDirector = (director: string) => {
    setSelectedDirector(director);
  };

  const handleToggle = (open: boolean, name: string) => {
    toggleOpenPersonDialog({ open, name });
  };

  const closePersonForm = () => toggleOpenPersonDialog({ open: false, name: '' });

  const prepareData = (data: FilmFormValue) => {
    const image = data.imageInput[0];
    const year = data.yearInput;
    const yearEnd = stillRunning ? null : data.yearEndInput;
    const duration = data.durationInput;
    const rate = data.rateInput;

    const payload = {
      title: data.title,
      description: data.description,
      tvShow: data.tvShow,
      image,
      year: year.toISOString(),
      yearEnd: yearEnd ? yearEnd.toISOString() : null,
      duration: parseInt(duration),
      rate: parseFloat(rate),
      genres: selectedGenres,
      actors: selectedActors,
      director: selectedDirector,
    };

    switch (mode) {
      case 'create':
        createFilm && createFilm(payload);
        break;
      case 'update':
        updateFilm && updateFilm(payload);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(prepareData)}
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Stack spacing={3} pb="3">
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please enter a movie title',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
              return (
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
              );
            }}
          />
          <Controller
            name="durationInput"
            control={control}
            defaultValue={film.duration.toString()}
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
                minRows={4}
                variant="outlined"
              />
            )}
          />
          <Stack spacing={1}>
            <Typography component="legend">Rate</Typography>
            <Controller
              name="rateInput"
              control={control}
              defaultValue={film.rate.toString()}
              rules={{
                required: {
                  value: true,
                  message: 'Please rate the movie',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <Rating
                  name="rateInput"
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
            name="yearInput"
            control={control}
            defaultValue={yearValue}
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
          <Controller
            name="tvShow"
            control={control}
            defaultValue={film.tvShow}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={onChange} value={value} defaultChecked={value} />}
                  label="TV Show"
                />
              </FormGroup>
            )}
          />
          {isTvShow ? (
            <Controller
              name="stillRunning"
              defaultValue={stillRunning}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={onChange} value={value} defaultChecked={value} />}
                    label="Still running"
                  />
                </FormGroup>
              )}
            />
          ) : null}
          {isTvShow && !stillRunning ? (
            <Controller
              name="yearEndInput"
              control={control}
              defaultValue={yearEndValue}
              render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year']}
                    label="End year"
                    value={value}
                    onChange={onChange}
                    maxDate={new Date()}
                    minDate={releaseYear}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              )}
            />
          ) : null}

          <div>
            <Typography>Poster:</Typography>
            <StyledLabel htmlFor="image">
              <input
                type="file"
                multiple={true}
                style={{ cursor: 'pointer' }}
                {...register('imageInput', {
                  required: { value: film.image ? false : true, message: 'Please provide a movie poster' },
                })}
              />
              Upload poster
              <ImageIcon sx={{ marginLeft: '1rem' }} />
            </StyledLabel>
          </div>

          <FormSelects
            toggleOpen={handleToggle}
            addGenres={handleSelectGenre}
            addActors={handleSelectActors}
            addDirector={handleSelectDirector}
            defaultValues={defaultValues}
          />
        </Stack>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          endIcon={loading && <CircularProgress />}
          style={{ marginTop: '1rem' }}
          disabled={
            loading ||
            !isValid ||
            selectedDirector.length === 0 ||
            selectedGenres.length === 0 ||
            selectedActors.length === 0
          }>
          Save
        </Button>
      </form>
      {openPersonDialog.open && <AddPersonForm toggle={openPersonDialog} handleClose={closePersonForm} />}
    </div>
  );
};

export default FilmForm;
