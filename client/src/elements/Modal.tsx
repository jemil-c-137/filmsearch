import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IModalProps {
  btnText: string;
  modalTitle: string;
}

export const Modal: React.FC<IModalProps> = ({ btnText, modalTitle, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btnText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
