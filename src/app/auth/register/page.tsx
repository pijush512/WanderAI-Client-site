"use client";

import React from 'react';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* হেডার */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="text-slate-500 mt-2 text-sm">Join WanderAI and start your journey.</p>
      </div>

      {/* ফর্ম */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>

        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 mt-2">
          Create Account
        </button>

        {/* সেপারেটর */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest font-bold">or</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* গুগল সাইন আপ */}
        <button className="w-full border border-slate-200 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-slate-50 transition text-black">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="G" />
          Sign up with Google
        </button>
      </div>

      {/* লগইন লিঙ্ক */}
      <p className="text-center mt-8 text-sm text-slate-600">
        Already have an account? <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
      </p>
    </div>
  );
};

export default RegisterPage;