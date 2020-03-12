import axios from 'axios';
import Qs from 'qs';
axios.defaults.baseURL = 'http://localhost:8090/api/admin/'; //default url
axios.defaults.withCredentials=true;
// request interceptor
axios.interceptors.request.use(config => {
  config.data = Qs.stringify(config.data); // handle request data
  return config;
},
  err => {
    return Promise.reject(err);
  });
