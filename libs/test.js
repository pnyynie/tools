const axios = require('axios');
const url = 'http://10.20.145.100:8088/hsfa60/';
axios
  .get(url)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
