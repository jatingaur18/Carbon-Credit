import React, { useState } from 'react';
import { signup,login } from '../api/api';
import { Turnstile } from '@marsidev/react-turnstile';
import { useNavigate } from 'react-router-dom';


const BuyerSignup = ({onLogin}) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const SITE_KEY = process.env.REACT_APP_SITE_KEY || '1x00000000000000000000AA';
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
      await signup({ ...formData, role: 'buyer', 'cf-turnstile-response': captchaToken });
      const loginResponse = await login({...formData,role: 'buyer', 'cf-turnstile-response': captchaToken });

      localStorage.setItem("token", loginResponse.data.access_token);

      onLogin({ username: formData.username, role: 'buyer'});
      navigate('/buyer-dashboard');
      
    } catch (error) {
      console.error('Signup failed:', error);

    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-400 py-12 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="p-8">
          <div className="mb-1 text-sm font-semibold tracking-wide uppercase text-blue-700">Buyer Registration</div>
          <h2 className="block mt-1 text-2xl font-medium leading-tight text-blue-900">Create a buyer account</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-800" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-3 py-2 bg-white/50 border border-blue-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-800" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 bg-white/50 border border-blue-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
              <div>
              <label className="block mb-2 text-sm font-medium text-blue-800" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 bg-white/50 border border-blue-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-blue-600"
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
                className="w-full px-4 py-2 text-white font-semibold bg-blue-600 
                           hover:bg-blue-700 rounded-lg transition-colors duration-300"
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

export default BuyerSignup;
