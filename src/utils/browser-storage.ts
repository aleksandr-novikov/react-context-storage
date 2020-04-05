const parse = (storage: string | null): object | null =>
  storage ? JSON.parse(storage) : null;
const STORAGE_PREFIX = 'React-Context-Storage-';

export const retrieve = (
  id: string,
  isSessionStorage: boolean
): object | null => {
  const storageName = STORAGE_PREFIX + id;
  try {
    return parse(
      isSessionStorage
        ? sessionStorage.getItem(storageName)
        : localStorage.getItem(storageName)
    );
  } catch (error) {
    throw new Error(
      `Error getting ${
        isSessionStorage ? 'session' : 'local'
      } storage for ${storageName}`
    );
  }
};

export const save = (
  id: string,
  state: object,
  isSessionStorage: boolean
): void => {
  const storageName = STORAGE_PREFIX + id;
  try {
    const stringified = JSON.stringify(state);
    if (isSessionStorage) {
      sessionStorage.setItem(storageName, stringified);
    } else {
      localStorage.setItem(storageName, stringified);
    }
  } catch (error) {
    throw new Error(
      `Error setting ${
        isSessionStorage ? 'session' : 'local'
      } storage for ${storageName}`
    );
  }
};
