"use client";

import { useAuth } from '@/src/context/AuthContext';
import React, { useState } from 'react';
import axiosInstance from '../../lib/axiosInstance';
import { showAlert, toast } from '../../lib/alerts';
import { Eye, EyeOff, Mail, Lock, User, Camera, Loader2 } from 'lucide-react'; // আইকন ব্যবহার করার জন্য

const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null as File | null,
    role: 'user'
  });

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
        showAlert("Welcome! 🎉", "Account created successfully.", "success");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      showAlert("Error", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Join <span className="text-blue-600">WanderAI</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Start your journey with us today.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Full Name */}
          <div className="group">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </span>
              <input 
                name="name"
                type="text" 
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </span>
              <input 
                name="email"
                type="email" 
                placeholder="hello@example.com"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </span>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Profile Image Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Profile Image (Optional)
            </label>
            <div className="relative flex items-center">
              <input 
                name="image"
                type="file" 
                id="file-upload"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <label 
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              >
                <Camera className="mr-2 text-slate-400 group-hover:text-blue-500" size={18} />
                <span className="text-sm text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {formData.image ? formData.image.name : "Choose profile picture"}
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleRegister}
            disabled={loading}
            className={`w-full relative flex items-center justify-center py-3.5 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 overflow-hidden'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <a href="/auth/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;