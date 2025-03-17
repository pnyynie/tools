function add(params) {
  return window.WebContex.apis.client.add(params).then(resp => {
    console.log('client.add', params, resp);
    return resp;
  });
}

function modify(params) {
  return window.WebContex.apis.client.modify(params).then(resp => {
    console.log('client.modify', params, resp);
    return resp;
  });
}

function remove(params) {
  return window.WebContex.apis.client.remove(params).then(resp => {
    console.log('client.remove', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

function query(params) {
  return window.WebContex.apis.client.query(params).then(resp => {
    console.log('client.query', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

function queryConfig(params) {
  return window.WebContex.apis.client.queryConfig(params).then(resp => {
    console.log('client.queryConfig', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

function modifyConfig(params) {
  return window.WebContex.apis.client.modifyConfig(params).then(resp => {
    console.log('client.modifyConfig', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

function run(params) {
  return window.WebContex.apis.client.run(params).then(resp => {
    console.log('client.run', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

function versionsDetection(params) {
  return window.WebContex.apis.client.versionsDetection(params).then(resp => {
    console.log('client.versionsDetection', params, resp);
    if (resp.code !== 200) throw resp.message;
    return resp.data;
  });
}

const client = {
  add,
  modify,
  remove,
  query,
  queryConfig,
  modifyConfig,
  run,
  versionsDetection,
};

export default client;
