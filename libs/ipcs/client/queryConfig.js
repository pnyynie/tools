const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const getPath = require('../../utils/getPath');

async function handleQueryConfig(event, params) {
  try {
    if (!params || !params.id) return { code: -1, params, message: '参数错误，缺少 id。' };

    let filePath = getPath('storage');
    let dataString = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(dataString);

    let index = data.findIndex(item => item.id === params.id);

    if (index === -1) {
      return { code: -1, message: `查询失败，未找到 id 为 ${params.id} 的项。` };
    }

    let targetFile = data[index];

    let targetFilePath = path.join(targetFile.path, '/Config/servers.config');
    // let filePath = path.join(params.path, '/Config/system.config');
    let targetDataString = fs.readFileSync(targetFilePath, 'utf-8');

    return new Promise(resolve => {
      const parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(targetDataString, (error, result) => {
        if (error) {
          resolve({ code: -1, message: error });
        } else {
          let data = result.root.section.add._;
          resolve({ code: 200, data: JSON.parse(data), message: '' });
        }
      });
    });
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'queryConfig', handle: handleQueryConfig };
