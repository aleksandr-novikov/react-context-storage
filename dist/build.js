import React, { createContext, useState, useReducer } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var GLOBAL_STORAGE = {};

var createContextStorage = function createContextStorage() {
  return createContext({
    storage: {},
    dispatch: function dispatch(action) {
      console.log('Action dispatched: ', action);
      console.warn("You're using Storage.Consumer outside of Storage.Provider");
    }
  });
};

var updateGlobalStorage = function updateGlobalStorage(storage) {
  Object.assign(GLOBAL_STORAGE, storage);
};

var createStorage = function createStorage(storageName) {
  var contextStorage = createContextStorage();

  var storage = _defineProperty({}, storageName, contextStorage);

  updateGlobalStorage(storage);
  return storage[storageName];
};
var getStorage = function getStorage(storageName) {
  if (GLOBAL_STORAGE[storageName]) {
    return GLOBAL_STORAGE[storageName];
  }

  return null;
};

var parse = function parse(storage) {
  return storage ? JSON.parse(storage) : null;
};

var STORAGE_PREFIX = 'React-Context-Storage-';
var retrieve = function retrieve(id, isSessionStorage) {
  var storageName = STORAGE_PREFIX + id;

  try {
    return parse(isSessionStorage ? sessionStorage.getItem(storageName) : localStorage.getItem(storageName));
  } catch (error) {
    throw new Error("Error getting ".concat(isSessionStorage ? 'session' : 'local', " storage for ").concat(storageName));
  }
};
var save = function save(id, state, isSessionStorage) {
  var storageName = STORAGE_PREFIX + id;

  try {
    var stringified = JSON.stringify(state);

    if (isSessionStorage) {
      sessionStorage.setItem(storageName, stringified);
    } else {
      localStorage.setItem(storageName, stringified);
    }
  } catch (error) {
    throw new Error("Error setting ".concat(isSessionStorage ? 'session' : 'local', " storage for ").concat(storageName));
  }
};

/**
 * HOC providing context storage provider to the component
 */

var withStorageProvider = function withStorageProvider(_ref) {
  var storageName = _ref.storageName,
      defaultValues = _ref.defaultValues,
      reducer = _ref.reducer,
      useSession = _ref.useSession,
      useLocal = _ref.useLocal;
  return function (WrappedComponent) {
    return function (props) {
      var _useState = useState(null),
          _useState2 = _slicedToArray(_useState, 2),
          defaultState = _useState2[0],
          setDefaultState = _useState2[1];

      var getDefaultState = function getDefaultState() {
        if (useSession) {
          return retrieve(storageName, true) || defaultValues;
        }

        if (useLocal) {
          return retrieve(storageName, false) || defaultValues;
        }

        return defaultValues;
      };

      var getDefaultStorageValues = function getDefaultStorageValues() {
        if (defaultState === null) {
          var ds = getDefaultState();
          setDefaultState(ds);
          return ds;
        }

        return defaultState;
      };

      var _useReducer = useReducer(reducer, getDefaultStorageValues()),
          _useReducer2 = _slicedToArray(_useReducer, 2),
          storage = _useReducer2[0],
          dispatch = _useReducer2[1];

      if (useSession) {
        save(storageName, storage, true);
      } else if (useLocal) {
        save(storageName, storage, false);
      }

      var ContextStorage = getStorage(storageName) || createStorage(storageName);
      return React.createElement(ContextStorage.Provider, {
        value: {
          storage: storage,
          dispatch: dispatch
        }
      }, React.createElement(WrappedComponent, Object.assign({}, props)));
    };
  };
};
/**
 * HOC providing context storage values via context prop
 */

var withStorage = function withStorage(storageName) {
  return function (WrappedComponent) {
    return function (props) {
      var ContextStorage = getStorage(storageName);
      if (!ContextStorage) throw new Error('Invalid Storage name. Storage must be created using withStorageProvider()');
      return React.createElement(ContextStorage.Consumer, null, function (context) {
        return React.createElement(WrappedComponent, Object.assign({}, props, {
          context: context
        }));
      });
    };
  };
};

export { withStorage, withStorageProvider };
//# sourceMappingURL=build.js.map
