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
    updateFilm(input: $input) {
      id
      title
      year
      description
      rate
      duration
      image
      slug
      genres {
        name
        slug
        id
      }
      director {
        name
        slug
        image
        id
      }
      actors {
        name
        slug
        image
        id
      }
      tvShow
      yearEnd
    }
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

  const [updateFilm] = useMutation<UpdateFilm, UpdateFilmVariables>(UPDATE_FILM, {
    //@ts-ignore
    update(cache, { data: { updateFilm } }) {
      cache.modify({
        fields: {
          film(existingFilms = []) {
            console.log('here');
            const newFilmRef = cache.writeFragment({
              data: updateFilm,
              fragment: gql`
                fragment NewFilm on Film {
                  id
                  title
                  year
                  description
                  rate
                  duration
                  image
                  slug
                  genres {
                    name
                    slug
                    id
                  }
                  director {
                    name
                    slug
                    image
                    id
                  }
                  actors {
                    name
                    slug
                    image
                    id
                  }
                  tvShow
                  yearEnd
                }
              `,
            });
            return newFilmRef;
          },
        },
      });
    },
  });

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
