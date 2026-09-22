import { useState, useEffect } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
// import { PRODUCTS } from './data/products';
// import { ITEMS } from './data/items';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryCircles from './components/CategoryCircles';
import Footer from './components/Footer';

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
    wishlist.map(String).includes(String(item.id))
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
    const targetId = String(productId);
    setWishlist((prevWishlist) => {
      const stringifiedList = prevWishlist.map(String);
      if (stringifiedList.includes(targetId)) {
        return stringifiedList.filter((id) => id !== targetId);
      } else {
        return [...stringifiedList, targetId];
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

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalCartBadgeCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Hero Banner & Category Circles: Sirf tab dikhao jab koi search query na ho aur Category 'All' ho */}
      {!searchTerm && selectedCategory === 'All' && (
        <>
          <HeroBanner
            onShopNow={() => {
              const section = document.getElementById('featured-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <CategoryCircles
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </>
      )}

      {/* Main Catalog View Container */}
      <main id="featured-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section Header with Sort Dropdown on Right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : selectedCategory !== 'All'
                  ? `${selectedCategory}`
                  : 'Featured Products'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'} available
            </p>
          </div>

          {/* Clean Sort By Dropdown */}
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-800 text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-gray-500 animate-pulse">
              Loading fresh catalog from server...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="py-16 text-center bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 font-bold text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Retry Again
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-gray-800">No matching products found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find anything matching "{searchTerm || selectedCategory}". Try checking for typos or clear your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              sortedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.map(String).includes(String(item.id))}
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

      {/* Footer Component */}
      <Footer />

    </div>
  );
}