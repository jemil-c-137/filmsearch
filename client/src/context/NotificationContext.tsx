import React, { createContext, useContext, useState } from 'react';
import Notifcation from '../components/Notifcation';
import { NotificationType } from '../interfaces/types';

interface IProps {
  children: React.ReactNode;
}

interface ContextProps {
  notify: (content: INotificationContent) => void;
}

export interface INotificationContent {
  text: string;
  type: NotificationType;
}


export type NotificationStatuses = 'success' | 'error';

const NotificationContext = createContext<ContextProps>({} as ContextProps);

const NotificationProvider: React.FC<IProps> = ({ children }) => {
  const [message, setMessage] = useState<INotificationContent | null>(null);
  const [open, setOpen] = useState(false);

  const notify = (content: INotificationContent) => {
    setMessage(content);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {message && <Notifcation onClose={onClose} message={message} show={open} />}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): ContextProps => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
