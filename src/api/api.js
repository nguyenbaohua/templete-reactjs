import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000, // 10s
  withCredentials: false, // Bật nếu muốn gửi cookie
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    // Ví dụ xử lý riêng cho 401
    if (status === 401) {
      localStorage.removeItem('access_token');
      // Có thể redirect về trang login
      // window.location.href = '/login';
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
    });
  }
);

export default api;
