import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "./CartContext";
import Sidebar from "./Sidebar";
import ImageSlider from "./ImageSlider";

const FAV_STORAGE_KEY = "myAppFavourites";
const PRODUCTS_PER_PAGE = 50;
const TOTAL_PAGES = 3;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const currentPageParam = parseInt(searchParams.get("page"), 10);
  const [currentPage, setCurrentPage] = useState(
    currentPageParam && currentPageParam >= 1 && currentPageParam <= TOTAL_PAGES
      ? currentPageParam
      : 1
  );

  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const toggleFavourite = (productId) => {
    setFavourites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE * TOTAL_PAGES}`)
      .then((res) => res.json())
      .then((data) => {
        let filtered = data.products;

        if (searchTerm) {
          filtered = filtered.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setProducts(filtered);
        setIsLoading(false);
        if ((currentPage - 1) * PRODUCTS_PER_PAGE >= filtered.length) {
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, navigate, location.search]);

  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const pageProducts = products.slice(startIdx, endIdx);

  const [maxVisibleItems, setMaxVisibleItems] = useState(5);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartReady(true);
    }
  }, [cartItems]);
  
  useEffect(() => {
    if (!cartReady) return;
  
    const hasReloaded = sessionStorage.getItem("hasReloaded");
  
    if (!hasReloaded) {
      // First load or reload: set flag so next time we know page was loaded before
      sessionStorage.setItem("hasReloaded", "true");
    } else {
      // Page reloaded (or opened again) — show menu only now
      setShowNotificationMenu(true);
    }
  }, [cartReady]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 750) {
        setShowThumbnails(false);
      } else {
        setShowThumbnails(true);
      }

      if (width < 400) {
        setMaxVisibleItems(1);
      } else if (width < 1100) {
        setMaxVisibleItems(2);
      } else if (width < 1150) {
        setMaxVisibleItems(3);
      } else if (width < 1264) {
        setMaxVisibleItems(4);
      } else {
        setMaxVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-2 px-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <Sidebar isStatic={true} />




          <div className="flex-1 flex flex-col px-2">
            {showNotificationMenu && (
              <div className="w-full rounded p-2 h-18 shadow-inner overflow-hidden border border-gray-200 relative mb-4">
                <div className="flex items-center gap-4 overflow-x-auto pr-40">
                  <div className="flex items-center h-14 min-w-max pl-4">
                    <img className="w-6 h-6" src="/my-app/shopping-cart.svg" alt="Cart" />
                    <p className="text-sm ml-2 whitespace-nowrap flex items-center leading-tight">
                      You have <strong className="font-semibold ml-1 mr-1">{cartItems.length}</strong> items in your cart
                    </p>
                  </div>

                  <ul className="flex gap-4">
                    {showThumbnails &&
                      cartItems.slice(0, maxVisibleItems).map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-col items-center min-w-[80px] shrink-0"
                        >
                          <img
                            className="w-10 h-10 object-cover rounded"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                          <span className="text-xs text-center truncate max-w-[80px]">
                            {item.title}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 mr-2">
                <Link to="/checkout">
                  <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 whitespace-nowrap shadow-md">
                    Place an order
                  </button>
                  </Link>
                </div>
              </div>
            )}
         

            <div className="mb-2">
              <ImageSlider />
            </div>
            

            <Link to="#">
              <div className="flex justify-end mr-3 text-sm text-blue-900 mb-2">
                <p>All sales</p>
                <span> → </span>
              </div>
            </Link>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2 flex-1">
              {pageProducts.map((product) => {
                const isFavourited = favourites.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-100 overflow-hidden shadow-sm cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="flex justify-end">
                      <div
                        className={`flex items-center justify-end p-2 rounded w-10 cursor-pointer hover:bg-gray-100`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavourite(product.id);
                        }}
                        aria-label={
                          isFavourited
                            ? `Remove ${product.title} from favourites`
                            : `Add ${product.title} to favourites`
                        }
                        title={
                          isFavourited
                            ? "Remove from favourites"
                            : "Add to favourites"
                        }
                      >
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill={isFavourited ? "orange" : "none"}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                            stroke="orange"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="p-2 flex flex-col justify-between h-24">
                      <h2 className="text-sm font-semibold text-left truncate">
                        {product.title}
                      </h2>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-black font-bold">${product.price}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          aria-label={`Add ${product.title} to cart`}
                          className="p-1 rounded hover:bg-green-100 hover:bg-opacity-60 transition"
                        >
                          <img
                             src="/my-app/shopping-cart.svg"
                            alt="Add to cart"
                            className="w-6 h-6 cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6 mb-5 space-x-3">
        {[...Array(TOTAL_PAGES)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <Link
              key={pageNum}
              to={`?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ""}`}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>
    </div>
  );
}