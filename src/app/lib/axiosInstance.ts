import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// রিকোয়েস্ট পাঠানোর আগে টোকেন অ্যাড করার জন্য ইন্টারসেপ্টর
axiosInstance.interceptors.request.use(
  (config) => {
    // যেহেতু localStorage শুধু ব্রাউজারে থাকে, তাই এই চেকটি জরুরি
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;