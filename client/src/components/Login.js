import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { Turnstile } from '@marsidev/react-turnstile';


const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'buyer' });
  const [captchaToken, setCaptchaToken] = useState('');
  const navigate = useNavigate();
  const SITE_KEY = process.env.REACT_APP_SITE_KEY || '1x00000000000000000000AA';
  const [showPassword, setShowPassword] = useState(false);

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

      const response = await login({ ...formData, 'cf-turnstile-response': captchaToken });
      localStorage.setItem('token', response.data.access_token);
      const userRole = response.data.role;
      onLogin({ username: formData.username, role: userRole });
      navigate(userRole === 'admin' ? '/admin-dashboard' : '/buyer-dashboard');
    } catch (error) {
      console.error('Login failed:', error);

    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-200 py-12 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
      <div className="p-8 bg-emerald-50/90 shadow-lg rounded-xl">
        <div className="mb-1 text-sm font-semibold tracking-wide uppercase text-emerald-700">Welcome back</div>
        <h2 className="block mt-1 text-2xl font-medium leading-tight text-emerald-800">Login to your account</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-emerald-700" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-100/50"
              id="username"
              type="text"
              name="username"
              value={formData.username}
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
                className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-100/50"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-emerald-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-emerald-700" htmlFor="role">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-100/50"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
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
              className="w-full px-4 py-2 text-white font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      </div>
    </div>
  );
};

export default Login;