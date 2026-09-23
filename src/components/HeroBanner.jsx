import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner({ onShopNow }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1">
      {/* Padding ko sm:py-7 aur p-6 karke height compact ki gayi hai */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-50 via-sky-100 to-indigo-100 overflow-hidden shadow-sm border border-blue-100 px-6 py-6 sm:px-10 sm:py-7 flex flex-col md:flex-row items-center justify-between">

        {/* Left Text Content */}
        <div className="md:w-1/2 z-10 space-y-2.5 text-center md:text-left">
          <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-full uppercase tracking-wider">
            Trending Offers
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            Upgrade <br />
            <span className="text-blue-600">Your Everyday</span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm max-w-sm">
            Top brands. Great prices. Handpicked electronics, gadgets, and everyday essentials.
          </p>
          <div className="pt-1">
            <button
              onClick={onShopNow}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Product Graphic */}
        <div className="md:w-1/2 mt-4 md:mt-0 flex items-center justify-center relative">
          {/* Image height container ko 48/60 (h-48 sm:h-60) me lock kiya hai */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>

            {/* <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
              alt="Hero Headphone Showcase"
              className="relative z-10 max-h-full max-w-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
            /> */}
            <img
              src="/hero-gadgets.PNG"
              alt="Modern Gadgets Showcase"
              className="relative z-10 max-h-full max-w-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="hidden sm:block absolute right-2 top-2 text-right">
            <span className="text-blue-800 font-bold text-xs tracking-wide block">New</span>
            <span className="text-gray-900 font-black text-sm tracking-wider block">Arrivals</span>
            <div className="w-6 h-0.5 bg-blue-600 mt-0.5 ml-auto rounded-full"></div>
          </div>
        </div>

      </div>
    </section>
  );
}