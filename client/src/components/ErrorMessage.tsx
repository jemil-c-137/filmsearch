import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import React from 'react';

interface IErrorMessageProps {
  title?: string;
  text?: string;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({
  title = 'Ooops',
  text = 'Someting went wrong, please try again later',
}) => {
  return (
    <div>
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
