import React from 'react';

export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface ContextStorage {
  storage: object;
  dispatch: (action: Action) => void;
}

type Reducer = (state: object, action: Action) => object;

export interface StorageSettings {
  storageName: string;
  defaultValues: object;
  reducer: Reducer;
  useSession: boolean;
  useLocal: boolean;
}

export interface ReactContextStorage {
  [key: string]: React.Context<ContextStorage>;
}
