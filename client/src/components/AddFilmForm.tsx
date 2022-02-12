import { Paper, Typography } from '@mui/material';

import { gql, useMutation } from '@apollo/client';

import { Modal } from '../elements';
import FilmForm from './FilmForm';

import { Film_film } from '../interfaces/Film';
import { CreateFilmInput } from '../interfaces/globalTypes';
import { AddFilm, AddFilmVariables } from '../interfaces/AddFilm';
import { useState } from 'react';

export type TToggleCreatePerson = { open: boolean; name: string };

const ADD_FILM_MUTATION = gql`
  mutation AddFilm($input: CreateFilmInput!) {
    addFilm(input: $input) {
      title
    }
  }
`;

const AddFilmForm = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const [addFilm] = useMutation<AddFilm, AddFilmVariables>(ADD_FILM_MUTATION);

  const defaultValues: Film_film = {
    title: '',
    duration: 0,
    description: '',
    rate: 0,
    slug: '',
    year: new Date().toISOString(),
    tvShow: false,
    yearEnd: new Date().toISOString(),
    image: '',
    actors: [],
    director: {
      __typename: 'Person',
      slug: '',
      image: '',
      name: '',
      id: '',
    },
    genres: [],
    __typename: 'Film',
  };

  const onSubmit = async (payload: CreateFilmInput) => {
    addFilm({ variables: { input: payload } })
      .then((res) => {
        console.log('response success', res);
        setOpen(false);
      })
      .catch((res) => {
        console.log('response error', res);
        setOpen(false);
      });
  };

  return (
    <Paper>
      <Typography variant="h6"> Form Demo </Typography>

      <Modal isOpen={isOpen} toggleOpen={toggleOpen} btnText="add film" modalTitle="Add a movie">
        <FilmForm film={defaultValues} createFilm={onSubmit} mode="create" />
      </Modal>
    </Paper>
  );
};

export default AddFilmForm;
