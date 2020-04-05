import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withStorage, withStorageProvider } from '../index';

configure({ adapter: new Adapter() });

const initialValue = 1;
const incrementValue = 5;

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const storageName = 'counter-storage';

const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + action.value };
    default:
      throw new Error('Unknown action');
  }
};
const Consumer = ({
  context: {
    storage: { counter },
    dispatch,
  },
}) => {
  const onClick = () =>
    dispatch({ type: INCREMENT_COUNTER, value: incrementValue });
  return (
    <>
      <button type="submit" onClick={onClick}>
        Increment
      </button>
      <div id="counter">{counter}</div>
    </>
  );
};
const ConsumerWithStorage = withStorage(storageName)(Consumer);

const Component = () => <ConsumerWithStorage />;
const ComponentWithStorageProvider = withStorageProvider({
  storageName,
  defaultValues: {
    counter: initialValue,
  },
  reducer: counterReducer,
  useSession: false,
  useLocal: false,
})(Component);

describe('Testing withStorage() and withStorageProvider() from react-context-storage', () => {
  test('Consumer receives default Storage value', () => {
    const componentWithStorage = mount(<ComponentWithStorageProvider />);
    expect(componentWithStorage.find('#counter').text()).toBe(
      String(initialValue)
    );
  });

  test('Storage gets new value after dispatching an action', () => {
    const componentWithStorage = mount(<ComponentWithStorageProvider />);
    const button = componentWithStorage.find("button[type='submit']");
    button.simulate('click');
    expect(componentWithStorage.find('#counter').text()).toBe(
      String(initialValue + incrementValue)
    );
  });
});
