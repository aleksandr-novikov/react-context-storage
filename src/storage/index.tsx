import React, { useEffect, useReducer, useState } from 'react';
import { getStorage, createStorage } from './storages';
import { retrieve, save } from '../utils/browser-storage';
import { Action, StorageSettings } from './types';

/**
 * HOC providing context storage provider to the component
 */
export const withStorageProvider = ({
  storageName,
  defaultValues,
  reducer,
  useSession,
  useLocal,
}: StorageSettings) => <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => (props: P): JSX.Element => {
  const [defaultState, setDefaultState] = useState<object | null>(null);

  const getDefaultState = (): object => {
    if (useSession) {
      return retrieve(storageName, true) || defaultValues;
    }
    if (useLocal) {
      return retrieve(storageName, false) || defaultValues;
    }
    return defaultValues;
  };

  const getDefaultStorageValues = (): object => {
    if (defaultState === null) {
      const ds = getDefaultState();
      setDefaultState(ds);
      return ds;
    }
    return defaultState;
  };

  const [storage, dispatch] = useReducer(reducer, defaultState, () =>
    getDefaultStorageValues()
  );

  useEffect(() => {
    if (useSession) {
      save(storageName, storage, true);
    } else if (useLocal) {
      save(storageName, storage, false);
    }
  }, [storageName, storage, useSession, useLocal]);

  const ContextStorage = getStorage(storageName) || createStorage(storageName);

  return (
    <ContextStorage.Provider
      value={{
        storage,
        dispatch,
      }}
    >
      <WrappedComponent {...(props as P)} />
    </ContextStorage.Provider>
  );
};

/**
 * HOC providing context storage values via context prop
 */
export const withStorage = (storageName: string) => <
  P extends {
    context?: { storage: object; dispatch: (action: Action) => void };
  },
  R = Omit<P, 'context'>
>(
  WrappedComponent: React.ComponentType<P>
) => (props: R): JSX.Element => {
  const ContextStorage = getStorage(storageName);

  if (!ContextStorage)
    throw new Error(
      'Invalid Storage name. Storage must be created using withStorageProvider()'
    );

  return (
    <ContextStorage.Consumer>
      {(context: React.ContextType<typeof ContextStorage>): JSX.Element => {
        return (
          <WrappedComponent {...((props as unknown) as P)} context={context} />
        );
      }}
    </ContextStorage.Consumer>
  );
};
