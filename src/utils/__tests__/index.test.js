import { save, retrieve } from '../browser-storage';

const storageId = 'Test-Storage-Id';
const testState = {
  test: 'value',
};

describe('Testing save() and retrieve() utils for react-context-storage', () => {
  test('with SessionStorage', () => {
    save(storageId, testState, true);
    const retrievedValue = JSON.stringify(retrieve(storageId, true));
    expect(retrievedValue).toBe(JSON.stringify(testState));
  });

  test('with LocalStorage', () => {
    save(storageId, testState, false);
    const retrievedValue = JSON.stringify(retrieve(storageId, false));
    expect(retrievedValue).toBe(JSON.stringify(testState));
  });
});
