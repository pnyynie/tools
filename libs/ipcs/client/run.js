const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const iconv = require('iconv-lite');
const { exec } = require('child_process');
const getPath = require('../../utils/getPath');

async function handleRun(event, params) {
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

    let serversPath = path.join(targetFile.path, '/Config/servers.config');
    let serversDataString = fs.readFileSync(serversPath, 'utf-8');

    return new Promise(resolve => {
      const parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(serversDataString, (error, result) => {
        if (error) {
          resolve({ code: -1, message: error });
        } else {
          let { Address } = params;
          let data = result.root.section.add._;
          data = JSON.parse(data);
          data.Servers = data.Servers.map(item => {
            return {
              ...item,
              IsDefault: item.Address === Address,
            };
          });
          result.root.section.add._ = JSON.stringify(data);

          const builder = new xml2js.Builder({ headless: true });
          const xml = builder.buildObject(result);
          fs.writeFileSync(serversPath, xml, 'utf-8');

          let execPath = path.join(targetFile.path, '/Hsfa.Main.exe');
          exec(`"${execPath}"`, { encoding: 'buffer' }, (error, stdout, stderr) => {
            if (error) {
              const utf8Stderr = iconv.decode(Buffer.from(stderr, 'binary'), 'gbk');
              // resolve({ code: 200, message: `执行出错:${utf8Stderr}` });
              return;
            }
            // resolve({ code: 200, message: `执行中止:${stdout}` });
          });

          resolve({ code: 200, message: `执行成功` });
        }
      });
    });
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'run', handle: handleRun };
