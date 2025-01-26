import React, { useState, useEffect } from 'react';
import {Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import AdminSignup from './components/AdminSignup';
import BuyerSignup from './components/BuyerSignup';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import TestPage from './components/testPage';
import Home from './components/Home';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CCProvider } from './context/SmartContractConnector';
import { jwtDecode } from "jwt-decode";


const Navigation = ({ user, onLogout }) => (
  <nav className="bg-white shadow-md">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-primary">CarbonCredit</span>
        </div>
        <div className="hidden sm:flex sm:ml-6 sm:space-x-4">
          {!user && (
            <>
              <Link to="/login" className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Login</Link>
              <Link to="/admin-signup" className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Admin Signup</Link>
              <Link to="/buyer-signup" className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Buyer Signup</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin-dashboard" className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Admin Dashboard</Link>
          )}
          {user && user.role === 'buyer' && (
            <Link to="/buyer-dashboard" className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Buyer Dashboard</Link>
          )}
          {user && (
            <button onClick={onLogout} className="py-2 px-3 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 hover:text-primary">Logout</button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  useEffect(() => {
    document.title = "Carbon Credits";
    const token = localStorage.getItem('token');
    
    if(token){
      console.log("token found!")
      try{
        const decodedToken = jwtDecode(token);
        const parsedSub = JSON.parse(decodedToken.sub);
        const isExpired = decodedToken.exp*1000<Date.now();
        console.log(decodedToken);
        if(!isExpired){
          console.log('token is alive');
          setUser({
            username: parsedSub.username,
            role: parsedSub.role
          });
          navigate(parsedSub.role === 'admin' ? '/admin-dashboard' : '/buyer-dashboard');
          
        }
        else{
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
          //redirect to login
        }
      }catch(error){
        console.error("Token failure:", error);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
      }
      
    } 
  }, [navigate]);

  return (
    <CCProvider>
      {/* <Router> */}
        <div className="min-h-screen bg-background">
          <Navigation user={user} onLogout={handleLogout} />
          <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Routes>
              <Route path="/home" elemnent={<Home/>} />
              <Route path="/admin-signup" element={<AdminSignup onLogin={handleLogin}/>} />
              <Route path="/buyer-signup" element={<BuyerSignup onLogin={handleLogin} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/test" element={<TestPage />} />
              <Route
                path="/admin-dashboard"
                element={
                  user && user.role === 'admin' ?
                    <AdminDashboard onLogout={handleLogout} /> :
                    <Navigate to="/login" replace />
                }
              />
              <Route
                path="/buyer-dashboard"
                element={
                  user && user.role === 'buyer' ?
                    <BuyerDashboard onLogout={handleLogout} /> :
                    <Navigate to="/login" replace />
                }
              />
              <Route path="/" element={
                user? 
                user.role==='admin'? <Navigate to="/admin-dashboard" replace/>: <Navigate to="/buyer-dashboard" replace/>

                : <Navigate to="/login" replace/>}
              />
            </Routes>
          </div>
          <SpeedInsights />
        </div>
      {/* </Router> */}
    </CCProvider>
  );
};

export default App;
