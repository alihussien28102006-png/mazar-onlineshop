import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Mazar Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">mazar</h3>
                <p className="text-emerald-400 text-sm">visit your style</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Mazar is your destination for authentic streetwear. A place of visitation where style meets substance, 
              and every piece tells your unique story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 mazar. All rights reserved. Visit your style.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;