import React from 'react';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const navCategories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Toys'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Poori Navbar Ek Hi Single Row (Line) Me */}
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* 1. Brand Logo */}
          <div 
            onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 h-14 object-contain rounded"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xl font-black tracking-tight text-green-600">
              Pandey <span className="text-blue-600">E-Store</span>
            </span>
          </div>

          {/* 2. Inline Categories Links (Usi Same Line Me) */}
          <nav className="hidden xl:flex items-center gap-5 flex-shrink-0">
            <button
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className={`text-xs font-semibold tracking-wide transition-colors ${
                selectedCategory === 'All' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              All
            </button>
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchTerm(''); }}
                className={`text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* 3. Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xs sm:max-w-sm md:max-w-md flex items-center"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-3.5 pr-10 py-1.5 sm:py-2 bg-gray-50 border border-gray-300 rounded-l-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span className="text-xs font-bold leading-none">✕</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-r-lg border border-blue-600 transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* 4. Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            {/* Account */}
            <button
              type="button"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden sm:block mt-0.5">Account</span>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[10px] font-medium hidden sm:block mt-0.5">Wishlist</span>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-medium hidden sm:block mt-0.5">Cart</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}