const fs = require('fs');
const getPath = require('../../utils/getPath');

async function handleAdd(event, params) {
  try {
    let filePath = getPath('storage');
    let dataString = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(dataString);
    let maxId = data.length ? Math.max(...data.map(i => i.id)) : 0;
    data.push({
      ...params,
      id: ++maxId,
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { code: 200, message: '' };
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'add', handle: handleAdd };
