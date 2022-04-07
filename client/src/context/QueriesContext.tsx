import React, { createContext, useContext, useState } from 'react';
import { SortBy, SortingField, Order } from '../interfaces/globalTypes';

interface IProps {
  children: React.ReactNode;
}

interface IQueryVariables {
  sortBy: SortBy;
}

interface QueriesContextProps {
  updateQueryVariables: (variables: IQueryVariables) => void;
  queryVariables: IQueryVariables;
}

export type NotificationStatuses = 'success' | 'error';

const QueriesContext = createContext<QueriesContextProps>({} as QueriesContextProps);

const QueriesProvider: React.FC<IProps> = ({ children }) => {
  const [queryVariables, setQueryVariables] = useState<IQueryVariables>({
    sortBy: { field: SortingField.title, order: Order.ASC },
  } as IQueryVariables);

  const updateQueryVariables = (variables: IQueryVariables) => {
    setQueryVariables(variables);
  };

  return <QueriesContext.Provider value={{ updateQueryVariables, queryVariables }}>{children}</QueriesContext.Provider>;
};

export const useQueriesContext = (): QueriesContextProps => {
  return useContext(QueriesContext);
};

export default QueriesProvider;
