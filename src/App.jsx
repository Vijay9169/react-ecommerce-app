import { useState, useEffect } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
// import { PRODUCTS } from './data/products';
// import { ITEMS } from './data/items';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

export default function App() {

  // =========================================================================
  // 1. APPLICATION STATES
  // =========================================================================

  // Cart Drawer open (true) ya close (false) rakhne ke liye flag
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist Drawer open (true) ya close (false) rakhne ke liye flag
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Server ya database se aane wale products ko store karne wali main list
  const [products, setProducts] = useState([]);
  
  // Data fetch hote waqt loading spinner dikhane ka status (by default true)
  const [isLoading, setIsLoading] = useState(true);
  
  // Agar API call fail ho jaye toh error message store karne ke liye
  const [error, setError] = useState(null);

  // Cart State: LocalStorage se saved items load karta hai, agar na ho toh empty array []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist State: LocalStorage se saved product IDs load karta hai, agar na ho toh empty array []
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("shopsphere_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // User ne category filter strip me kaunsi category select ki hai (Default: "All")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Search input box me user dwara type kiya gaya keyword
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown se chuni gayi sorting technique ("default", "price-low", "price-high", "rating-high")
  const [sortBy, setSortBy] = useState("default");


  // =========================================================================
  // 2. DATA PIPELINE & CALCULATIONS (Derived States)
  // =========================================================================

  // Wishlist me saved IDs ke zariye active products me se unka full details array banana
  const wishlistedProducts = products.filter((item) =>
    wishlist.includes(item.id)
  );
  
  // Dynamic products list se duplicate categories hatakar unique categories ki list banana
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Pipeline Step 1: Category match aur Search keyword match karne wala filtered array
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pipeline Step 2: Filtered products ko user ki sorting choice ke mutabiq arrange karna
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price; // Saste se mehnga (Ascending)
    }
    if (sortBy === "price-high") {
      return b.price - a.price; // Mehange se sasta (Descending)
    }
    if (sortBy === "rating-high") {
      return b.rating - a.rating; // Top rating pehle
    }
    return 0; // Default featured order
  });

  // Cart me maujood saare items ki total quantity calculate karna (Badge count ke liye)
  const totalCartBadgeCount = cart.reduce((acc, item) => acc + item.quantity, 0);


  // =========================================================================
  // 3. EVENT HANDLERS (Business Logic Functions)
  // =========================================================================

  // Function: Product ko cart me add karna (naya ho toh push, purana ho toh quantity + 1)
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function: Cart drawer ke andar item ki quantity increase (+1) ya decrease (-1) karna
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
        .filter(Boolean) // Quantity 0 hone par array se item drop kar do
    );
  };

  // Function: Cart me se kisi item ko directly remove/delete karna
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function: Wishlist me product ID ko toggle karna (pehle se ho toh remove, na ho toh add)
  const handleToggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  // Function: Wishlist item ko cart me shift karke wishlist se delete karna
  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleToggleWishlist(product.id);
  };


  // =========================================================================
  // 4. SIDE EFFECTS (Lifecycle & Synchronization)
  // =========================================================================

  // Side-Effect 1: Jab-jab 'cart' state badle, browser ke localStorage me auto-save karo
  useEffect(() => {
    localStorage.setItem("shopsphere_cart", JSON.stringify(cart));
  }, [cart]);

  // Side-Effect 2: Jab-jab 'wishlist' state badle, browser ke localStorage me auto-save karo
  useEffect(() => {
    localStorage.setItem("shopsphere_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Side-Effect 3: Component load hone par ek baar server/database se products data fetch karna
  // useEffect(() => {
  //   const fetchProductsFromDatabase = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);
  
  //       // Mock Server Delay (2 second artificial wait)
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  
  //       // Raw static sources combine kiye (Real backend aane par API response replace hoga)
  //       const combinedData = [...PRODUCTS, ...ITEMS];
  
  //       setProducts(combinedData);
  //     } catch (err) {
  //       setError("Products load karne me samasya aayi. Kripya dobara koshish karein!");
  //     } finally {
  //       setIsLoading(false); // Spinner off karna
  //     }
  //   };
  
  //   fetchProductsFromDatabase();
  // }, []); // Empty dependency array: Sirf Component Mount par ek baar chalega

  // Backend Connet
  // Real Backend API Call (MongoDB Atlas -> Express -> React)
  useEffect(() => {
    const fetchProductsFromBackend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Express backend route ko call kiya
        const response = await fetch('http://localhost:5000/api/products');

        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }

        const jsonResult = await response.json();

        // MongoDB ki '_id' ko standard 'id' me map kiya
        const mappedProducts = jsonResult.data.map((item) => ({
          ...item,
          id: item._id, // Existing components (Cart, Wishlist, Cards) 'item.id' expect karte hain
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error('API Fetch Error:', err);
        setError('Backend server se product load nahi ho paye. Please verify backend is running.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsFromBackend();
  }, []);


  // =========================================================================
  // 5. VIEW RENDERING (User Interface JSX)
  // =========================================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">

        {/* Brand Logo & Store Name */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Pandey E-Store Logo" className="h-14 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Pandey E-Store
          </span>
        </div>

        {/* Header Action Buttons (Wishlist & Cart) */}
        <div className="flex items-center gap-3">
          
          {/* Wishlist Trigger Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-2 rounded-lg text-sm font-semibold border border-rose-100 transition active:scale-95 cursor-pointer"
          >
            <Heart size={18} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-rose-400"} />
            <span>Wishlist</span>
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1">
              {wishlist.length}
            </span>
          </button>
        
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

        </div>

      </header>

      {/* Centered Category Filter Buttons */}
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

      {/* Search Input & Sorting Controls Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          
          {/* Search Box Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-72"
          />
      
          {/* Sort Dropdown Selector */}
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

      {/* Main Catalog View Container */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Catalog Section Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Featured Products</h1>
            <p className="text-sm text-slate-500">
              Explore our latest high-quality arrivals
            </p>
          </div>
          <span className="text-sm text-slate-400 font-medium">
            {sortedProducts.length} items
          </span>
        </div>
      
        {/* Condition 1: Data Loading Spinner View */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 animate-pulse">
              Loading fresh catalog from server...
            </p>
          </div>
        ) : error ? (
          /* Condition 2: Server / Network Error View */
          <div className="py-16 text-center bg-rose-50 border border-rose-200 rounded-2xl p-6">
            <p className="text-rose-600 font-bold text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Retry Again
            </button>
          </div>
        ) : (
          /* Condition 3: Success Catalog Grid View */
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
        )}

      </main>

      {/* Cart Drawer Slide-over Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Wishlist Drawer Slide-over Panel */}
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