import React from 'react';
import { Mail, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
      {/* 1. Value Proposition Highlights Strip */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-800 rounded-xl text-blue-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Delivery</h4>
              <p className="text-xs text-gray-400 mt-0.5">Orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-800 rounded-xl text-blue-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy Returns</h4>
              <p className="text-xs text-gray-400 mt-0.5">7-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-800 rounded-xl text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Secure</h4>
              <p className="text-xs text-gray-400 mt-0.5">Encrypted transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-800 rounded-xl text-blue-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Support</h4>
              <p className="text-xs text-gray-400 mt-0.5">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Description */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain rounded"
            />
            <span className="text-xl font-bold tracking-tight text-green-600">
              Pandey <span className="text-blue-500">E-Store</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Discover handpicked modern electronics, everyday lifestyle gadgets, and premium essentials at direct prices.
          </p>
          <div className="pt-2">
            <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm">
              <input
                type="email"
                placeholder="Enter email for offers..."
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold rounded-r-lg transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Join</span>
              </button>
            </form>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop</h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><a href="#featured-section" className="hover:text-white transition-colors">Electronics</a></li>
            <li><a href="#featured-section" className="hover:text-white transition-colors">Fashion & Apparel</a></li>
            <li><a href="#featured-section" className="hover:text-white transition-colors">Home & Living</a></li>
            <li><a href="#featured-section" className="hover:text-white transition-colors">Beauty & Grooming</a></li>
            <li><a href="#featured-section" className="hover:text-white transition-colors">Sports Gear</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Care</h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><span className="hover:text-white cursor-pointer transition-colors">Track Order</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Shipping Rates</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Returns & Refunds</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Help Center</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Contact Us</span></li>
          </ul>
        </div>

        {/* Legal & Policies */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Security Standards</span></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Copyright Strip */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        <p>© 2026 Pandey E-Store. Built with React, Tailwind CSS, Node.js & MongoDB Atlas.</p>
      </div>
    </footer>
  );
}