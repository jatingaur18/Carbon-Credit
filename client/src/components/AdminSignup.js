import React, { useState } from 'react';
import { signup, login } from '../api/api';
import { Turnstile } from '@marsidev/react-turnstile';
import { useNavigate } from 'react-router-dom';


const AdminSignup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const SITE_KEY = process.env.REACT_APP_SITE_KEY || '1x00000000000000000000AA';
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }
    e.preventDefault();
    try {
      console.log("FormData:", formData);
      await signup({ ...formData, role: 'admin', 'cf-turnstile-response': captchaToken });
      const loginResponse = await login({ ...formData, role: 'admin', 'cf-turnstile-response': captchaToken });

      localStorage.setItem("token", loginResponse.data.access_token);

      onLogin({ username: formData.username, role: 'admin' });
      navigate('/admin-dashboard');

    } catch (error) {
      console.error('Signup failed:', error);

    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 w-full min-h-screen bg-gradient-to-br from-emerald-500 to-blue-200">
      <div className="w-full max-w-md rounded-xl shadow-xl bg-white/90 backdrop-blur-sm">
        <div className="p-8">
          <div className="mb-1 text-sm font-semibold tracking-wide text-emerald-700 uppercase">Admin Registration</div>
          <h2 className="block mt-1 text-2xl font-medium leading-tight text-emerald-900">Create an admin account</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-800" htmlFor="username">
                Username
              </label>
              <input
                className="py-2 px-3 w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/50"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-800" htmlFor="email">
                Email
              </label>
              <input
                className="py-2 px-3 w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/50"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="py-2 px-3 w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/50"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-3 items-center text-emerald-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div>
              <Turnstile
                options={{
                  theme: 'light',
                }}
                siteKey={SITE_KEY}
                onError={() => alert('CAPTCHA failed Try again')}
                onSuccess={(token) => setCaptchaToken(token)}
              />
            </div>
            <div>
              <button
                className="py-2 px-4 w-full font-semibold text-white bg-emerald-700 rounded-lg transition-colors duration-300 hover:bg-emerald-800"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
