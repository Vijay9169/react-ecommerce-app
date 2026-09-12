import { Star, Plus, Heart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition duration-200">
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        {/* Category Badge (Top Left) */}
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-slate-700 shadow-sm">
          {product.category}
        </span>

        {/* NAYA: Heart Wishlist Button (Top Right) */}
        <button onClick={()=> onToggleWishlist(product.id)}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition active:scale-90"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
          <Heart size={18} className={`transition-colors duration-200 ${ isWishlisted ? "fill-rose-500 text-rose-500"
            : "text-slate-400 hover:text-rose-500" }`} />
        </button>

      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-amber-500 text-xs font-medium mb-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>

        <h3 className="font-semibold text-slate-800 text-base line-clamp-1">
          {product.name}
        </h3>

        <p className="text-slate-500 text-xs mt-1 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition active:scale-95"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}