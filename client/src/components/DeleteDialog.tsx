import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DeleteFilm, DeleteFilmVariables } from '../interfaces/DeleteFilm';

const DELETE_FILM_MUTATION = gql`
  mutation DeleteFilm($slug: String!) {
    deleteFilm(slug: $slug)
  }
`;

interface IDeleteDialogProp {
  slug: string;
}

const DeleteDialog: React.FC<IDeleteDialogProp> = ({ slug }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const [deleteFilm] = useMutation<DeleteFilm, DeleteFilmVariables>(DELETE_FILM_MUTATION);

  const handleClick = () => {
    deleteFilm({ variables: { slug } }).then((res) => {
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
