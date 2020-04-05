export interface Action {
  type: string;
  value: number;
}

export interface Counter {
  counter: number;
}

export interface ContextStorage {
  storage: Counter;
  dispatch: (action: Action) => void;
}
