import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  // Dollar price ko standard INR me convert aur format karne ke liye
  const currentPrice = Math.round(product.price * 80);
  const originalPrice = Math.round(currentPrice * 1.35); // 35% higher MRP
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div className="group relative bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

      {/* 1. Image Container with Badges & Wishlist */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        {/* Discount / Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
          {product.badge ? (
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-amber-500 text-white shadow-sm">
              {product.badge}
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-emerald-600 text-white shadow-sm">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
              }`}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.5'}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* 3. Pricing & Add to Cart Button */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Free Delivery</span>
          </div>

          {/* Add Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all hover:shadow active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  );
}