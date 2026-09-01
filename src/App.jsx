import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={26} />
          <span className="text-xl font-bold tracking-tight text-slate-800">ShopSphere</span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Cart (0)
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-full mb-4">
          Day 1 Complete
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
          Welcome to ShopSphere
        </h1>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
          Modern React.js E-Commerce Store with Vite, Tailwind CSS, Node.js Backend, and AWS Services.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition">
            Start Shopping <ArrowRight size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}