import React from 'react';
import { withStorageProvider, withStorage } from '../storage';
import { INCREMENT_COUNTER } from './actions';
import { counterReducer } from './reducers';
import { ContextStorage } from './types';

const storageName = 'counter-storage';
const defaultValues = {
  counter: 0,
};
const useSession = true;
const useLocal = false;

const Consumer = ({
  context: {
    storage: { counter },
    dispatch,
  },
}: {
  context: ContextStorage;
}): JSX.Element => {
  const onClick = (): void => dispatch({ type: INCREMENT_COUNTER, value: 1 });

  return (
    <>
      <button type="submit" onClick={onClick}>
        Increment counter
      </button>
      <p>{`Counter value: ${counter}`}</p>
    </>
  );
};

const ConsumerWithStorage = withStorage(storageName)(Consumer);

const App = (): JSX.Element => (
  <>
    <h2>Sample Counter App</h2>
    <ConsumerWithStorage />
  </>
);

export const AppWithStorageProvider = withStorageProvider({
  storageName,
  defaultValues,
  reducer: counterReducer,
  useSession,
  useLocal,
})(App);
