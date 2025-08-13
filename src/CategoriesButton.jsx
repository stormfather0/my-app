import React, { useRef } from "react";
import Sidebar from "./Sidebar";

export default function CategoriesButton({
  showCategoriesPopup,
  setShowCategoriesPopup,
  className = "", // pass extra classes here
}) {
  const categoriesButtonRef = useRef(null);
  const categoriesPopupRef = useRef(null);

  return (
    <div className="relative">
      <button
        ref={categoriesButtonRef}
        onClick={() => setShowCategoriesPopup((prev) => !prev)}
        className={`w-30 flex items-center gap-2 px-3 py-2 border border-gray-500 rounded-lg hover:bg-gray-700 transition cursor-pointer ${className}`}
        aria-haspopup="true"
        aria-expanded={showCategoriesPopup}
      >
        <img className="w-5 h-5" src="./menu.svg" alt="Categories" />
        <span className="text-sm font-medium">Categories</span>
      </button>

      {showCategoriesPopup && (
        <div
          ref={categoriesPopupRef}
          className="
            fixed top-[64px] left-[20px] right-[20px]
            bg-white rounded-lg shadow-lg z-50 text-black
            px-4
          "
          style={{
            height: "calc(100vh - 64px - 20px)",
            overflow: "hidden",
          }}
        >
          <Sidebar isStatic={true} height="h-full overflow-auto" />
        </div>
      )}
    </div>
  );
}