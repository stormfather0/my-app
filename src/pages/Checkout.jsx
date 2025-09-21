import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import AdditionalOptionsDropdown from "../AdditionalOptionsDropdown";

export default function Checkout() {
  const { cartItems, setCartItems, updateQuantity, removeFromCart } = useCart();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const calculateItemTotal = (item) => {
    const basePrice = item.price * item.quantity;
    const optionsTotal =
      (item.selectedOptions?.reduce((sum, option) => sum + option.price, 0) || 0) *
      item.quantity;
    return (basePrice + optionsTotal).toFixed(2);
  };

  const calculateOptionsTotal = (item) => {
    return (
      (item.selectedOptions?.reduce((sum, option) => sum + option.price, 0) || 0) *
      item.quantity
    ).toFixed(2);
  };

  const total = cartItems
    .reduce((sum, item) => {
      const basePrice = item.price * item.quantity;
      const optionsTotal =
        (item.selectedOptions?.reduce((sum, option) => sum + option.price, 0) || 0) *
        item.quantity;
      return sum + basePrice + optionsTotal;
    }, 0)
    .toFixed(2);

  // Immutable update of selected options
  const updateSelectedOptions = (itemId, updatedOptions) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selectedOptions: updatedOptions } : item
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-sm text-gray-600">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-6 flex flex-col gap-4">
                {/* ===== Top div: product info ===== */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.thumbnail || item.image || item.images?.[0]}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-gray-100 shadow-sm"
                    />
                  </Link>

                  <div className="flex flex-col flex-grow justify-start items-start">
  <p className="font-semibold text-lg text-gray-800 mb-2">
    {item.title}
  </p>


                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded-lg overflow-hidden h-8 ">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-1 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="px-1 text-gray-700 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-1 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setConfirmDeleteId(
                              confirmDeleteId === item.id ? null : item.id
                            )
                          }
                          className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash size={14} />
                          Remove
                        </button>

                        {confirmDeleteId === item.id && (
                          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                            <p className="text-sm text-gray-700 mb-2">
                              Remove this item?
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  removeFromCart(item.id);
                                  setConfirmDeleteId(null);
                                }}
                                className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="flex flex-col items-end min-w-[120px] sm:min-w-[160px] text-sm text-gray-600">
                    <div className="flex justify-between w-full gap-50">
                      <span className="font-medium">Base Price:</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.selectedOptions?.length > 0 && (
                      <div className="w-full mt-1">
                        <ul className="space-y-1">
                          {item.selectedOptions.map((option) => (
                            <li key={option.id} className="flex justify-between">
                              <span className="text-gray-500">{option.label}</span>
                              <span>
                                ${(option.price * item.quantity).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between mt-1">
                          {/* <span className="font-medium">Options Total:</span>
                          <span>${calculateOptionsTotal(item)}</span> */}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between w-full mt-2 pt-2 border-t border-gray-200">
                      <span className="font-bold text-gray-800">Total:</span>
                      <span className="font-bold text-gray-800">
                        ${calculateItemTotal(item)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ===== Bottom div: product options dropdown ===== */}
                <div className="mt-2">
                  <AdditionalOptionsDropdown
                    selectedOptions={item.selectedOptions || []}
                    onChange={(updatedOptions) =>
                      updateSelectedOptions(item.id, updatedOptions)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Total */}
 


          <div className="mt-8 flex justify-end items-center gap-4">
            <p className="text-xl font-semibold text-gray-700">Cart Total:</p>
            <p className="text-2xl font-bold text-green-600">${total}</p>
          </div>



          <div className="mt-8 flex justify-between gap-4">
            <Link
              to="/"
              className="px-6 py-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Continue Shopping
            </Link>
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => alert("Proceeding to checkout (not implemented)")}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}