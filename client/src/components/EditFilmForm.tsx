import { Paper, Typography } from '@mui/material';

import { gql, useMutation } from '@apollo/client';

import { Modal } from '../elements';
import FilmForm from './FilmForm';

import { Film_film } from '../interfaces/Film';
import { UpdateFilmInput } from '../interfaces/globalTypes';
import { UpdateFilm, UpdateFilmVariables } from '../interfaces/UpdateFilm';
import { useState } from 'react';

export type TToggleCreatePerson = { open: boolean; name: string };

const UPDATE_FILM = gql`
  mutation UpdateFilm($input: UpdateFilmInput!) {
    updateFilm(input: $input)
  }
`;

interface IAddFilmFormProps {
  film: Film_film;
}

export type UpdatedFilm = Omit<UpdateFilmInput, 'slug'>;

const EditFilmForm: React.FC<IAddFilmFormProps> = ({ film }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const [updateFilm] = useMutation<UpdateFilm, UpdateFilmVariables>(UPDATE_FILM);

  const onSubmit = async (updatedFilm: UpdatedFilm) => {
    const payload = {
      ...updatedFilm,
      slug: film.slug,
    };
    updateFilm({ variables: { input: payload } })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log('error', err);
        setOpen(false);
      });
  };

  return (
    <Paper>
      <Modal isOpen={isOpen} toggleOpen={toggleOpen} btnText="Edit film" modalTitle={`Edit a ${film.title}`}>
        <FilmForm film={film} updateFilm={onSubmit} mode="update" />
      </Modal>
    </Paper>
  );
};

export default EditFilmForm;
