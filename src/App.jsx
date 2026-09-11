import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { ITEMS } from './data/items';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';

export default function App() {
  // State 1: Drawer open/close status
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State 2: Cart items array
  const [cart, setCart] = useState([]);

  // Dono arrays ko combine kar lo:
  const ALL_PRODUCTS = [...PRODUCTS, ...ITEMS];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Unique categories nikalne ke liye Set ka use
  const categories = ["All", ...new Set(ALL_PRODUCTS.map((p) => p.category))];

  const filteredProducts = selectedCategory === "All" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

  // Handler: Cart me product add karna
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Agar pehle se maujood hai toh quantity + 1 karo
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Naya item hai toh quantity: 1 ke sath array me jodo
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Handler: Quantity update karna (+1 ya -1)
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) // Agar quantity 0 ho gayi toh array se hatao
    );
  };

  // Handler: Direct delete item
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalCartBadgeCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={26} />
          <span className="text-xl font-bold tracking-tight text-slate-800">
            ShopSphere
          </span>
        </div>

        {/* Cart Trigger Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-sm active:scale-95"
        >
          <ShoppingBag size={18} />
          <span>Cart</span>
          <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
            {totalCartBadgeCount}
          </span>
        </button>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 mt-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Catalog View */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Featured Products</h1>
            <p className="text-sm text-slate-500">
              Explore our latest high-quality arrivals
            </p>
          </div>
          <span className="text-sm text-slate-400 font-medium">
            {filteredProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Cart Drawer Overlay & Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}