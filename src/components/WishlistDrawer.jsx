import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
}) {
  // Guard Clause: Agar drawer band hai to kuch render mat karo
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 1. Backdrop (Kaala Parda) */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. Slide Panel Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              My Wishlist ({wishlistItems.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body: Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <p className="text-base font-semibold text-slate-600">Your wishlist is empty</p>
                <p className="text-xs mt-1">Click the heart on products you love to save them here.</p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-bold text-indigo-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions: Move to Cart & Remove */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onMoveToCart(item)}
                      title="Move to Cart"
                      className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition"
                    >
                      <ShoppingBag size={16} />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      title="Remove"
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}