import { INCREMENT_COUNTER } from '../actions';
import { Action, Counter } from '../types';

export const counterReducer = (state: Counter, action: Action): object => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + action.value };
    default:
      throw new Error('Unknown action');
  }
};
