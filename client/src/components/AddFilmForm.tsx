import { Paper } from '@mui/material';

import { gql, useMutation } from '@apollo/client';

import { Modal } from '../elements';
import FilmForm from './FilmForm';

import { Film_film } from '../interfaces/Film';
import { CreateFilmInput } from '../interfaces/globalTypes';
import { useState } from 'react';
import { useNotificationContext } from '../context/NotificationContext';
import { NotificationType } from '../interfaces/types';

export type TToggleCreatePerson = { open: boolean; name: string };

const ADD_FILM_MUTATION = gql`
  mutation AddFilm($input: CreateFilmInput!) {
    addFilm(input: $input) {
      id
      title
      tvShow
      yearEnd
      genres {
        name
        id
        slug
      }
      year
      rate
      slug
      duration
      image
    }
  }
`;

const AddFilmForm = () => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotificationContext();

  const toggleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const [addFilm] = useMutation(ADD_FILM_MUTATION, {
    update(cache, { data: { addFilm } }) {
      cache.modify({
        fields: {
          films(existingFilms) {
            console.log('existing films', existingFilms);
            const newFilmRef = cache.writeFragment({
              data: addFilm,
              fragment: gql`
                fragment NewFilm on Films {
                  id
                  title
                  tvShow
                  yearEnd
                  genres {
                    name
                    id
                    slug
                  }
                  year
                  rate
                  slug
                  duration
                  image
                }
              `,
            });
            let prevFilms = existingFilms ? existingFilms.films : [];
            return [...prevFilms, newFilmRef];
          },
        },
      });
    },
  });

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
    id: '',
  };

  const onSubmit = async (payload: CreateFilmInput) => {
    setLoading(true);
    addFilm({ variables: { input: payload } })
      .then((res) => {
        console.log('response success', res);
        if (notify) {
          notify({ text: 'Film added', type: NotificationType.SUCCESS });
        }
        setLoading(false);
        setOpen(false);
      })
      .catch((res) => {
        if (notify) {
          notify({ text: 'Film adding failed', type: NotificationType.ERROR });
        }
        console.log('response error', res);
        setOpen(false);
      });
  };

  return (
    <Paper>
      <Modal isOpen={isOpen} toggleOpen={toggleOpen} btnText="add film" modalTitle="Add a movie">
        <FilmForm film={defaultValues} createFilm={onSubmit} mode="create" loading={loading} />
      </Modal>
    </Paper>
  );
};

export default AddFilmForm;
