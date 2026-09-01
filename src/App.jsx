import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={26} />
          <span className="text-xl font-bold tracking-tight text-slate-800">ShopSphere</span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Cart (0)
        </button>
      </header>

      {/* Product Catalog Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Featured Products</h1>
            <p className="text-sm text-slate-500">Explore our latest high-quality arrivals</p>
          </div>
          <span className="text-sm text-slate-400">{PRODUCTS.length} items</span>
        </div>

        {/* Dynamic Mapping equivalent to Angular *ngFor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </main>
    </div>
  );
}