import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { DeleteFilm, DeleteFilmVariables } from '../interfaces/DeleteFilm';

const DELETE_FILM_MUTATION = gql`
  mutation DeleteFilm($slug: String!) {
    deleteFilm(slug: $slug) {
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

interface IDeleteDialogProp {
  slug: string;
}

const DeleteDialog: React.FC<IDeleteDialogProp> = ({ slug }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const [deleteFilm] = useMutation<DeleteFilm, DeleteFilmVariables>(DELETE_FILM_MUTATION, {
    //@ts-ignore
    update(cache, { data: { deleteFilm } }) {
      cache.modify({
        fields: {
          films(existingFilms = []) {
            const newFilmRef = cache.writeFragment({
              data: deleteFilm,
              fragment: gql`
                fragment NewFilm on Film {
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
            return existingFilms.filter((film: any) => film.__ref !== newFilmRef?.__ref);
          },
        },
      });
    },
  });

  const handleClick = () => {
    setLoading(true);
    deleteFilm({ variables: { slug } }).then((res) => {
      setLoading(false);
      console.log(res, 'response');
      if (res.data?.deleteFilm) {
        history.push('/');
      }
    });
  };

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClickOpen} endIcon={<DeleteForeverIcon />}>
        Delete film
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Delete film?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete movie?</DialogContentText>
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
