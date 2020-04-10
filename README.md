# react-context-storage

This is a very lightweight(~8kb) alternative to Redux store based on React Context API. Support multiple storages, reducers, saving to LocalStorage and SessionStorage.


## Installation
```
npm install react-context-storage
```

## Requirements
React v^16.9.0

## API

### withStorageProvider
```typescript
withStorageProvider(
{
  storageName: string, // Name of your storage
  defaultValues: object, // Default state values of your storage
  reducer: (state: object, action: { type: string, value: any }) => object, // Reducer that takes in storage state, modifies it based on action type and returns a new state
  useSession: boolean, // Save storage to SessionStorage and use it next time by storageName
  useLocal: boolean, // Save storage to LocalStorage and use it next time by storageName
}
)(
  Provider: React.ComponentType // This component will provide Storage to child components
)
```

### withStorage

```typescript
withStorage(
  storageName: string // Name of your storage
)(
  Consumer: React.ComponentType // Storage will be passed to this component via "context" prop
)
```

## Usage

Please check out **src/sample-app** for a live demo.

```tsx
import React from 'react';
import { withStorageProvider, withStorage } from 'react-context-storage';
import { INCREMENT_COUNTER } from './actions';
import { counterReducer } from './reducers';

const storageName = 'counter-storage';
const defaultValues = {
  counter: 0,
};
const useSession = true;
const useLocal = false;

/* 
Consumer component that will have a "context" prop which contains 2 properties:
  storage - your storage object
  dispatch - function that dispatches an action which gets passed into your reducer
*/
const Consumer = ({
  context: {
    storage: { counter },
    dispatch,
  },
}) => {
  const onClick = () => dispatch({ type: INCREMENT_COUNTER, value: 1 });
  return (
    <>
      <button type="submit" onClick={onClick}>
        Increment counter
      </button>
      <p>{`Counter value: ${counter}`}</p>
    </>
  );
};

/*
Wraps Consumer component with Storage
*/
const ConsumerWithStorage = withStorage(storageName)(Consumer);

/*
Parent component that will be wrapped with Storage Provider
*/
const App = () => (
  <>
    <h2>Counter App</h2>
    <ConsumerWithStorage />
  </>
);

/* 
Wraps parent component with Storage Provider allowing using Storage in children components.
Pass in your reducer to handle actions dispatched in Consumer components
*/
export const AppWithStorageProvider = withStorageProvider({
  storageName,
  defaultValues,
  reducer: counterReducer,
  useSession,
  useLocal,
})(App);
```

## License

Copyright (c) 2020 Aleksandr Novikov. MIT License.
