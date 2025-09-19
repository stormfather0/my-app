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
                className="h-8 object-contain block md:hidden"
              />
              <img
                src="./logo-20-years.svg"
                alt="Logo"
                className="h-8 object-contain hidden md:block"
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
<div className="relative flex-1 min-w-0" ref={dropdownRef}>
  <form
    onSubmit={handleSearch}
    className="flex bg-white rounded-md shadow-sm overflow-hidden w-full"
  >
    <input
      type="search"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-grow min-w-0 px-3 py-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    {/* Search button - hidden on small screens */}
    <button
      type="submit"
      className="hidden sm:flex bg-green-600 hover:bg-green-700 px-4 py-2 text-white items-center justify-center"
    >
      <img src="./search.svg" alt="Search" className="w-6 h-6" />
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