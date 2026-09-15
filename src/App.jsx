import { useState, useEffect } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { ITEMS } from './data/items';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

export default function App() {

  // 1. STATES (Sabse pehle)
  // Drawer open/close status
  const [isCartOpen, setIsCartOpen] = useState(false);

  // A. Nayi state drawer open/close ke liye
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Cart items array
  // const [cart, setCart] = useState([]);

  // Cart State: LocalStorage se purana samaan load karo (agar ho), warna []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist me save ki gayi product IDs ka array
  // const [wishlist, setWishlist] = useState([]);

  // Wishlist State: LocalStorage se purani saved IDs load karo, warna []
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("shopsphere_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  // State for Sorting (default value: "default")
  const [sortBy, setSortBy] = useState("default");

  // 2. DATA PIPELINE & CALCULATIONS (Beech me)
  // Dono arrays ko combine kar lo:
  const ALL_PRODUCTS = [...PRODUCTS, ...ITEMS];

  // B. Derived list: IDs se full product details extract karna:
  const wishlistedProducts = ALL_PRODUCTS.filter((item) =>
    wishlist.includes(item.id)
  );
  
  // Unique categories nikalne ke liye Set ka use
  const categories = ["All", ...new Set(ALL_PRODUCTS.map((p) => p.category))];

  //Category + Search filter
  const filteredProducts = ALL_PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // LOGIC: Filtered array ko sort karo
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price; // Saste se mehnga (Ascending)
    }
    if (sortBy === "price-high") {
      return b.price - a.price; // Mehange se sasta (Descending)
    }
    if (sortBy === "rating-high") {
      return b.rating - a.rating; // Sabse achhi rating pehle
    }
    return 0; // "default" par koi chhed-chhad nahi, jaisa hai waisa hi rahe
  });

  const totalCartBadgeCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 3. EVENT HANDLERS (Buttons ke functions)
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

  // Handler: ID ko add ya remove (toggle) karne ka logic
  const handleToggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        // Agar pehle se hai to filter karke hata do
        return prevWishlist.filter((id) => id !== productId);
      } else {
        // Agar nahi hai to purane array me naya id jod do
        return [...prevWishlist, productId];
      }
    });
  };

  // C. Move to cart handler:
  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleToggleWishlist(product.id);
  };

  // 4. USE EFFECT (YAHAN LIKHTE HAIN - RETURN SE THEEK PEHLE)
  // Side-Effect 1: Jab-jab 'cart' array badle, use localStorage me save kar do
  useEffect(() => {
    localStorage.setItem("shopsphere_cart", JSON.stringify(cart));
  }, [cart]);

  // Side-Effect 2: Jab-jab 'wishlist' array badle, use localStorage me save kar do
  useEffect(() => {
    localStorage.setItem("shopsphere_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        
        {/* <div className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={26} />
          <span className="text-xl font-bold tracking-tight text-slate-800">
            ShopSphere
          </span>
        </div> */}

        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Pandey E-Store Logo" 
            className="h-14 w-auto object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Pandey E-Store
          </span>
        </div>

        <div className="flex items-center gap-3">
            {/* Wishlist Trigger Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-2 rounded-lg text-sm font-semibold border border-rose-100 transition active:scale-95 cursor-pointer">
              <Heart size={18} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-rose-400"} />
              <span>Wishlist</span>
              <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                {wishlist.length}
              </span>
            </button>
        
          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-sm active:scale-95">
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
              {totalCartBadgeCount}
            </span>
          </button>
        </div>

      </header>

      {/* Centered Category Buttons Container */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex gap-2 items-center justify-center flex-wrap pb-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Left & Right spacing ke liye: max-w-6xl mx-auto px-6 */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-72"
          />
      
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="default">Featured (Default)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>
      
        </div>
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

          {sortedProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              <p className="text-base font-semibold text-slate-600">No products found</p>
              <p className="text-xs mt-1">Try searching for a different keyword or category.</p>
            </div>
          ) : (
            sortedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.includes(item.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))
          )}

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

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
      />

    </div>
  );
}