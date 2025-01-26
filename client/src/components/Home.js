import React from 'react';
import { Leaf, Globe, Lock, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Leaf className="text-emerald-600" size={32} />
          <h1 className="text-2xl font-bold text-emerald-800">Carbon Credits</h1>
        </div>
        <nav className="space-x-6">
          <a href="#" className="text-emerald-700 hover:text-emerald-900">Platform</a>
          <a href="#" className="text-emerald-700 hover:text-emerald-900">How It Works</a>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition">
            Connect Wallet
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 mt-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold text-emerald-900 mb-6">
            Democratizing Carbon Trading on the Blockchain
          </h2>
          <p className="text-xl text-emerald-800 mb-8">
            Transparent, secure, and accessible carbon credit trading powered by Ethereum. 
            Empower your sustainability efforts with verifiable, tradable carbon credits.
          </p>
          <div className="flex space-x-4">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition">
              Launch App
            </button>
            <button className="border-2 border-emerald-600 text-emerald-700 px-6 py-3 rounded-full hover:bg-emerald-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-semibold text-emerald-900 mb-6">Platform Features</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Globe className="text-emerald-600" size={40} />
              <div>
                <h4 className="font-bold text-emerald-800">Global Carbon Market</h4>
                <p className="text-emerald-700">Trade credits across international boundaries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Lock className="text-emerald-600" size={40} />
              <div>
                <h4 className="font-bold text-emerald-800">Blockchain Security</h4>
                <p className="text-emerald-700">Immutable and transparent transaction records</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="text-emerald-600" size={40} />
              <div>
                <h4 className="font-bold text-emerald-800">Verified Credits</h4>
                <p className="text-emerald-700">Every credit authenticated and traceable</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-8 mt-16 text-center">
        <p className="text-emerald-800">
          © 2024 Carbon Credits. Powering Sustainable Future through Blockchain Technology.
        </p>
      </footer>
    </div>
  );
};

export default Home;