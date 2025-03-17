const axios = require('axios');

function getVersion(address) {
  const url = `http://${address}/hsfa60/`;
  return axios.get(url).then(resp => {
    // if (['10.20.154.72:8088', '10.20.145.99:8088', '10.20.44.198:8088', '10.20.147.80:8088'].includes(address)) {
    //   console.log(address, resp.data);
    // }
    return (resp.status === 200 && resp.data) || '';
  });
}

function htmlStringCapture(str) {
  const regex1 = /global\.versionTimestamp\s*=\s*"([^"]+)"/;
  const match = str.match(regex1);
  let version = '';
  if (match) {
    version = match[1];
  } else {
    const regex2 = /v=([^"]+)/;
    const match2 = str.match(regex2);
    if (match2) {
      version = match2[1];
    }
  }

  if (version.indexOf('.') === -1) {
    version = '';
  }

  // 去掉前缀：FA6.0-Funddate. 或 FA6.0. 或 FA6-6.0-
  version = version.replace(/FA6\.0-Funddate\.|FA6\.0\.|FA6-6\.0-/g, '');
  // 去掉开头的 V
  version = version.replace(/^V/, '');
  // 去掉后缀：-YYYYMMDD.HHMMSS
  version = version.replace(/-\d{8}\.\d{6}$/, '');
  // 将 - 替换为 .
  version = version.replace(/-/g, '.');

  return version;
}

async function handleVersionsDetection(event, params) {
  try {
    if (!params || !params.address) return { code: -1, params, message: '参数错误' };
    const addressList = params.address.split(',');
    const versions = await Promise.all(addressList.map(getVersion)).then(resps => resps.map(htmlStringCapture));
    const data = {};
    addressList.forEach((item, index) => {
      data[item] = versions[index];
    });
    return { code: 200, data, message: 'success' };
  } catch (error) {
    return { code: -1, message: error };
  }
}

module.exports = { key: 'versionsDetection', handle: handleVersionsDetection };
