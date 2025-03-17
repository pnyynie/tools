const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const getPath = require('../../utils/getPath');

async function modifyConfig(event, params) {
  try {
    let { type, id, data } = params || {};
    if (!id) return { code: -1, params, message: '参数错误，缺少 id。' };

    let filePath = getPath('storage');
    let clientDataString = fs.readFileSync(filePath, 'utf-8');
    let clientData = JSON.parse(clientDataString);
    let index = clientData.findIndex(item => item.id === params.id);
    if (index === -1) {
      return { code: -1, message: `查询失败，未找到 id 为 ${params.id} 的项。` };
    }

    let targetClient = clientData[index];
    let targetPath = '';
    if (type === 'servers') {
      targetPath = path.join(targetClient.path, '/Config/servers.config');
    } else if (type === 'system') {
      targetPath = path.join(params.path, '/Config/system.config');
    }
    let targetDataString = fs.readFileSync(targetPath, 'utf-8');

    const parser = new xml2js.Parser({ explicitArray: false });
    const builder = new xml2js.Builder({ headless: true });
    return parser.parseStringPromise(targetDataString).then(result => {
      let serverDataString = result.root.section.add._;
      let serverData = JSON.parse(serverDataString);
      serverData.Servers = data;
      result.root.section.add._ = JSON.stringify(serverData);
      let newXmlData = builder.buildObject(result);
      fs.writeFileSync(targetPath, newXmlData, 'utf-8');
      return { code: 200, data: newXmlData, message: '' };
    });
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'modifyConfig', handle: modifyConfig };
