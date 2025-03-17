const fs = require('fs');
const env = process.env.NODE_ENV;
const getPath = require('../../utils/getPath');

function handleQuery() {
  try {
    let filePath = getPath('storage');
    let dataString = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(dataString);
    return { code: 200, data, message: '', env, resourcesPath: process.resourcesPath };
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'query', handle: handleQuery };
