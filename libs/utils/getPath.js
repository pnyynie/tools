const path = require('path');
const env = process.env.NODE_ENV;

function getPath(key) {
  if (key === 'storage') {
    let filePath = '';
    if (env === 'development') {
      filePath = path.join(__dirname, '../storage/jsons/clients.json');
    } else {
      filePath = path.join(process.resourcesPath, '/storage/jsons/clients.json');
    }
    return filePath;
  }

  return '';
}

module.exports = getPath;
