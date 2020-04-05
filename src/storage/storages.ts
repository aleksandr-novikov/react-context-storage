import React, { createContext } from 'react';
import { Action, ContextStorage, ReactContextStorage } from './types';

const GLOBAL_STORAGE: ReactContextStorage = {};

const createContextStorage = (): React.Context<{
  dispatch: (action: Action) => void;
  storage: object;
}> =>
  createContext({
    storage: {},
    dispatch: (action: Action) => {
      console.log('Action dispatched: ', action);
      console.warn(`You're using Storage.Consumer outside of Storage.Provider`);
    },
  });

const updateGlobalStorage = (storage: ReactContextStorage): void => {
  Object.assign(GLOBAL_STORAGE, storage);
};

export const createStorage = (
  storageName: string
): React.Context<ContextStorage> => {
  const contextStorage = createContextStorage();
  const storage = { [storageName]: contextStorage };
  updateGlobalStorage(storage);
  return storage[storageName];
};

export const getStorage = (
  storageName: string
): React.Context<ContextStorage> | null => {
  if (GLOBAL_STORAGE[storageName]) {
    return GLOBAL_STORAGE[storageName];
  }
  return null;
};
