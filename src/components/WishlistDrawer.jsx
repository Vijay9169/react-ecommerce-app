import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <h2 className="text-lg font-bold text-gray-900">My Wishlist</h2>
              <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                {wishlistItems.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <Heart className="w-12 h-12 stroke-[1.5] text-gray-300 mb-3" />
                <p className="text-base font-medium text-gray-700">Your wishlist is empty</p>
                <p className="text-xs text-gray-400 mt-1">Tap the heart on any item to save it here</p>
              </div>
            ) : (
              wishlistItems.map((item) => {
                const itemPrice = Math.round(item.price * 80);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-gray-50/70 border border-gray-100 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg bg-white border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                          {item.category}
                        </p>
                        <p className="text-sm font-bold text-gray-900 mt-1">
                          ₹{itemPrice.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Move to cart & Delete buttons */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                        <button
                          onClick={() => onMoveToCart(item)}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm transition-colors"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                        <button
                          onClick={() => onRemoveFromWishlist(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}