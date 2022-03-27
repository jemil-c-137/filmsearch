import React, { createContext, useContext, useState } from 'react';
import NotificationList from '../components/Notifcation';
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

export interface INotifcationProps {
  id: number;
  show: boolean;
  content: INotificationContent;
}

export type NotificationStatuses = 'success' | 'error';

const NotificationContext = createContext<ContextProps>({} as ContextProps);

const NotificationProvider: React.FC<IProps> = ({ children }) => {
  const [notificationsList, setNotifications] = useState([] as INotifcationProps[]);

  const notify = (content: INotificationContent) => {
    const notification: INotifcationProps = {
      content: {
        ...content,
      },
      id: notificationsList.length,
      show: true,
    };
    setNotifications((state) => [...notificationsList, notification]);
  };

  const onClose = (id: number) => {
    const newList = notificationsList.filter((notification) => notification.id !== id);
    setNotifications(newList);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationList notifications={notificationsList} onClose={onClose} />
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): ContextProps => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
