import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
  // 套餐相关
  getPackages() {
    return axios.get(`${API_URL}/packages`);
  },

  // 代理相关
  getAgent() {
    return axios.get(`${API_URL}/agent`);
  },

  // 图片相关
  getGallery() {
    return axios.get(`${API_URL}/gallery`);
  }
}; 