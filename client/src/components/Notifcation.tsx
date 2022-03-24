import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React from 'react';
import { NotificationType } from '../interfaces/types';

interface INotifcationProps {
  show: boolean;
  message: {
    text: string;
    type: NotificationType;
  };
  onClose: () => void;
}

const Notifcation: React.FC<INotifcationProps> = ({ show, message, onClose }) => {
  const { type, text } = message;

  return (
    <div>
      <Snackbar
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={show}>
        <Alert onClose={onClose} severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notifcation;
