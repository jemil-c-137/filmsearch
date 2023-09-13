import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IModalProps {
  btnText: string;
  modalTitle: string;
  isOpen: boolean;
  toggleOpen: (isOpen: boolean) => void;
}

export const Modal: React.FC<IModalProps> = ({ btnText, modalTitle, children, isOpen, toggleOpen }) => {
  const handleClickOpen = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btnText}
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
