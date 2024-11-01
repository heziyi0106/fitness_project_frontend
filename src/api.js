// src/api.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// 設定請求攔截器，添加 Authorization 標頭
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
