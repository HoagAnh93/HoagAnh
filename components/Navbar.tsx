import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { SITE_INFO } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-primary p-1.5 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              {SITE_INFO.name}
            </span>
          </div>
          <div>
            <a 
              href="#products" 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Xem Deal Mới
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;