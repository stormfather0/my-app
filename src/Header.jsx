import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import CategoriesButton from "./CategoriesButton";
import { useCart } from "./CartContext";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategoriesPopup, setShowCategoriesPopup] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("menu"); 


  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close suggestions on route change
useEffect(() => {
  setShowSuggestions(false);
}, [location.pathname]);

  // Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products))
      .catch(console.error);
  }, []);

  // Sync search with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchTerm(query);
  }, [location]);

  // Search suggestions
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm(product.title);
    setShowSuggestions(false);
  };

  return (
    <>
      <header className="fixed bg-gray-900 text-white shadow-md w-full z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3 gap-4">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="block w-7 h-0.5 bg-white rounded" />
              <span className="block w-7 h-0.5 bg-white rounded" />
              <span className="block w-7 h-0.5 bg-white rounded" />
            </button>

            <Link to="/" className="flex-shrink-0">
              <img
                src="./logo-small.svg"
                alt="Logo"
                className="h-8 object-contain block md:hidden cursor-pointer"
              />
              <img
                src="./logo-20-years.svg"
                alt="Logo"
                className="h-8 object-contain hidden md:block cursor-pointer"
              />
            </Link>
          </div>

          {/* Categories Button (Large screens) */}
          <div className="hidden lg:block">
            <CategoriesButton
              showCategoriesPopup={showCategoriesPopup}
              setShowCategoriesPopup={setShowCategoriesPopup}
            />
          </div>
{/* Search */}
<div className="relative flex-1 min-w-0 " ref={dropdownRef}>
  <form
    onSubmit={handleSearch}
    className="flex bg-white rounded-md shadow-sm overflow-hidden w-full focus:outline-none focus:ring-2"
  >
    <input
      type="search"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-grow min-w-0 px-3 py-2 text-gray-900 text-sm sm:text-base focus:outline-none "
    />

    {/* Voice Icon */}
    
<div className="flex items-center py-2 pr-1 cursor-pointer">
<svg width="30px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.29455 5.32435C8.46362 3.40732 10.0991 2 12 2C13.9009 2 15.5364 3.40732 15.7054 5.32435C15.794 6.3283 15.871 7.46841 15.871 8.41026C15.871 9.3521 15.794 10.4922 15.7054 11.4962C15.5364 13.4132 13.9009 14.8205 12 14.8205C10.0991 14.8205 8.46362 13.4132 8.29455 11.4962C8.20602 10.4922 8.12903 9.3521 8.12903 8.41026C8.12903 7.46841 8.20602 6.3283 8.29455 5.32435ZM12 3.53846C10.8657 3.53846 9.93291 4.37146 9.83703 5.45864C9.74967 6.44919 9.67742 7.53634 9.67742 8.41026C9.67742 9.28417 9.74967 10.3713 9.83703 11.3619C9.93291 12.4491 10.8657 13.2821 12 13.2821C13.1343 13.2821 14.0671 12.4491 14.163 11.3619C14.2503 10.3713 14.3226 9.28417 14.3226 8.41026C14.3226 7.53634 14.2503 6.44919 14.163 5.45865C14.0671 4.37146 13.1343 3.53846 12 3.53846Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.77419 8.15385C5.20177 8.15385 5.54839 8.49824 5.54839 8.92308C5.54839 9.84241 5.61777 10.9078 5.7222 11.9868C6.02346 15.0996 8.76916 17.3846 12 17.3846C15.2308 17.3846 17.9765 15.0996 18.2778 11.9868C18.3822 10.9078 18.4516 9.84241 18.4516 8.92308C18.4516 8.49824 18.7982 8.15385 19.2258 8.15385C19.6534 8.15385 20 8.49824 20 8.92308C20 9.91081 19.9259 11.0299 19.8191 12.134C19.459 15.8542 16.3909 18.5475 12.7742 18.8869V21.2308C12.7742 21.6556 12.4276 22 12 22C11.5724 22 11.2258 21.6556 11.2258 21.2308V18.8869C7.60911 18.5475 4.54095 15.8542 4.18092 12.134C4.07407 11.0299 4 9.91081 4 8.92308C4 8.49824 4.34662 8.15385 4.77419 8.15385Z" fill="#808080"/>
</svg>
</div>

    {/* Search button - hidden on small screens */}
    <button
      type="submit"
      className="hidden sm:flex bg-green-600 hover:bg-green-700 px-4 py-2 text-white items-center justify-center cursor-pointer"
    >
      <img src="./search.svg" alt="Search" className="w-6 h-6 " />
    </button>
  </form>



  {showSuggestions && suggestions.length > 0 && (
    <ul className="absolute z-50 bg-white text-black shadow-md rounded-md mt-1 w-full max-w-full overflow-y-auto border">
      {suggestions.map((product) => (
        <li
          key={product.id}
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSuggestionClick(product)}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-10 h-10 object-cover rounded"
          />
          <span className="truncate">{product.title}</span>
        </li>
      ))}
    </ul>
  )}
</div>
{/* Profile & Cart */}
<div className="flex items-center gap-6 flex-shrink-0">
  {/* Account icon - hidden on small screens */}
  <Link to="/Account" className="hidden sm:flex">
    <img
      className="w-7 h-7"
      src="./account.svg"
      alt="Profile"
    />
  </Link>

  <Link to="/checkout" className="relative">
    <img
      className="w-7 h-7"
      src="./shopping-cart.svg"
      alt="Cart"
    />
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </Link>
</div>
        </div>
      </header>

      {/* Sidebar controlled by hamburger */}
      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}