const Store = require('electron-store');
const store = new Store();

const x = {
  init: () => {},

  get: key => {
    return store.get(key);
  },

  set: (key, value) => {
    store.set(key, value);
  },
};

module.exports = x;
