import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "./CartContext";

const FAV_STORAGE_KEY = "myAppFavourites";

export default function Account() {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Toggle favourite on/off
  const toggleFavourite = (productId) => {
    setFavourites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    // Fetch enough products (max 150 for example)
    fetch(`https://dummyjson.com/products?limit=150`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter products to only favourites
  const favouriteProducts = products.filter((p) => favourites.includes(p.id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-2 px-2 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">My Favourite Products</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : favouriteProducts.length === 0 ? (
        <p className="text-gray-600">You have no favourite products yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2">
          {favouriteProducts.map((product) => {
            const isFavourited = favourites.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-100 overflow-hidden shadow-sm cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Favourites icon */}
                <div className="flex justify-end">
                  <div
                    className="flex items-center justify-end p-2 rounded w-10 cursor-pointer hover:bg-gray-100"
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
                        src="public/shopping-cart.svg"
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
      )}
      <div className="bg-red-500 md:bg-green-500 lg:bg-blue-500 h-32 w-full"></div>
    </div>
    
  );
}

