import React, { useState } from 'react';
import { signup,login } from '../api/api';
import { Turnstile } from '@marsidev/react-turnstile';
import { useNavigate } from 'react-router-dom';


const BuyerSignup = ({onLogin}) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState('');
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
