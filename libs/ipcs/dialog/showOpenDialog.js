const { dialog } = require('electron');

function handleShowOpenDialog() {
  return dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then(result => {
      if (!result.canceled) {
        let path = result.filePaths[0];
        return { code: 200, data: path, message: '' };
      } else {
        return { code: 200, data: '', message: '' };
      }
    })
    .catch(error => {
      return { code: -1, message: error };
    });
}

module.exports = { key: 'showOpenDialog', handle: handleShowOpenDialog };
