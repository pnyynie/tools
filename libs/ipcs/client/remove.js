const fs = require('fs');
const getPath = require('../../utils/getPath');

async function handleRemove(event, params) {
  try {
    if (!params.id) return { code: -1, message: '参数错误，缺少 id。' };

    let filePath = getPath('storage');
    let dataString = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(dataString);

    let index = data.findIndex(item => item.id === params.id);

    if (index === -1) {
      return { code: -1, message: `删除失败，未找到 id 为 ${params.id} 的项。` };
    }

    data.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { code: 200, message: '' };
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'remove', handle: handleRemove };
