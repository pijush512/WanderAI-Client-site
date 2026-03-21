"use client";

import { useAuth } from '@/src/context/AuthContext';
import React, { useState } from 'react';
import axiosInstance from '../../lib/axiosInstance';
import { showAlert, toast } from '../../lib/alerts';

const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null as File | null, // ইমেজের জন্য স্টেট
    role: 'user'
  });

  // ইনপুট হ্যান্ডেলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'image' && e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast("Please fill all fields!", "warning");
      return;
    }

    try {
      setLoading(true);

      // --- ফাইল পাঠানোর জন্য FormData অবজেক্ট তৈরি ---
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await axiosInstance.post('/users/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        login(response.data.token, response.data.data);
        showAlert(
          "Welcome to WanderAI! 🎉", 
          "Your account has been created successfully.", 
          "success"
        );
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      showAlert("Error", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input 
            name="name"
            type="text" 
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        {/* Profile Image Input - সাধারণ ইনপুট হিসেবে */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image</label>
          <input 
            name="image"
            type="file" 
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input 
            name="email"
            type="email" 
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input 
            name="password"
            type="password" 
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        <button 
          onClick={handleRegister}
          disabled={loading}
          className={`w-full ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg transition-all shadow-lg mt-2`}
        >
          {loading ? 'Processing...' : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;