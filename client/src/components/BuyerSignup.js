import React, { useState } from 'react';
import { signup } from '../api/api';

const BuyerSignup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ ...formData, role: 'buyer' });

    } catch (error) {
      console.error('Signup failed:', error);

    }
  };

  return (
    <div className="overflow-hidden mx-auto max-w-md bg-white rounded-xl shadow-md md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="mb-1 text-sm font-semibold tracking-wide uppercase text-secondary">Buyer Registration</div>
          <h2 className="block mt-1 text-lg font-medium leading-tight text-black">Create a buyer account</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                Username
              </label>
              <input
                className="input"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button className="btn btn-secondary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerSignup;
