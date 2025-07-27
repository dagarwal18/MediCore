import React from 'react';
import { Heart } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="backdrop-blur-md bg-white/80 border-b border-teal-100/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              SahayAI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Clinical Portal
            </button>
            <button className="text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Analytics
            </button>
            <button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all">
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;