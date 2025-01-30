
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-emerald-50/10 backdrop-blur-md shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link to="/home">
        <div className="flex items-center space-x-3">
          <LucideIcons.Leaf className="text-emerald-600" size={32} />
          <span className="text-2xl font-bold text-emerald-800">CarbonCredits</span>
        </div>
      </Link>
      <div className="flex space-x-4 items-center">
        {!user && (
          <>
            <Link
              to="/login"
              className="text-emerald-700 hover:text-emerald-900 transition"
            >
              Login
            </Link>
            <Link
              to="/admin-signup"
              className="text-emerald-700 hover:text-emerald-900 transition"
            >
              Admin Signup
            </Link>
            <Link
              to="/buyer-signup"
              className="text-emerald-700 hover:text-emerald-900 transition"
            >
              Buyer Signup
            </Link>
          </>
        )}
        {user && 
        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text font-semibold text-lg">
        Hi, {user.username}!
      </span>}
        {user && user.role === 'admin' && (
          <Link
            to="/admin-dashboard"
            className="text-emerald-700 hover:text-emerald-900 transition"
          >
            Admin Dashboard
          </Link>
        )}
        {user && user.role === 'buyer' && (
          <Link
            to="/buyer-dashboard"
            className="text-emerald-700 hover:text-emerald-900 transition"
          >
            Buyer Dashboard
          </Link>
        )}
        {user && (
          <button
            onClick={onLogout}
            className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition shadow-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;