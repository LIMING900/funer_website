import axios from 'axios';
import Vue from 'vue';

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 统一错误处理
    console.error('API错误:', error);
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios; 