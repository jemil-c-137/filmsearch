import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React, { useEffect } from 'react';
import { INotifcationProps } from '../context/NotificationContext';
import { NotificationType } from '../interfaces/types';

interface INotifcationsProps {
  notifications: INotifcationProps[];
  onClose: (id: number) => void;
}

interface INotificationProps {
  notification: INotifcationProps;
  onClose: (id: number) => void;
}

const Notification = ({ onClose, notification: { id, content } }: INotificationProps) => {
  useEffect(() => {
    if (content.type === NotificationType.ERROR) return;

    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Alert
      key={id}
      onClose={() => onClose(id)}
      severity={content.type}
      sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
      <h3>{content.text}</h3>
    </Alert>
  );
};

const NotificationList: React.FC<INotifcationsProps> = ({ notifications, onClose }) => {
  return (
    <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={true}>
      <div>
        {notifications.map((notification) => (
          <Notification notification={notification} onClose={onClose} />
        ))}
      </div>
    </Snackbar>
  );
};

export default NotificationList;
