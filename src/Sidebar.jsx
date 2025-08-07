import React from "react";
import { useState, useEffect } from 'react';
import FooterSubscribe from "./Footer/FooterSubscribe";

const categories = [
  { label: "Electronics", icon: "https://img.icons8.com/ios-filled/50/laptop.png" },
  { label: "Laptops and PC", icon: "https://img.icons8.com/ios-filled/50/computer.png" },
  { label: "Smartphones & TVs", icon: "https://img.icons8.com/ios-filled/50/smartphone.png" },
  { label: "For Gamers", icon: "https://img.icons8.com/ios-filled/50/controller.png" },
  { label: "Tools", icon: "https://img.icons8.com/ios-filled/50/000000/maintenance.png" },
  { label: "Clothing", icon: "https://img.icons8.com/ios-filled/50/clothes.png" },
  { label: "Shoes", icon: "https://img.icons8.com/ios-filled/50/shoes.png" },
  { label: "Groceries", icon: "https://img.icons8.com/ios-filled/50/shopping-basket.png" },
  { label: "Baby Products", icon: "https://img.icons8.com/ios-filled/50/baby.png" },
  { label: "Special Sale", icon: "https://icons.iconarchive.com/icons/icons8/ios7/512/Ecommerce-Sale-icon.png" },
  { label: "Chat With Us", icon: "/chat.svg" },
  { label: "Our Stores", icon: "/stores.svg" },
  { label: "Info", icon: "/info.svg" },
  

  

];






// Props:
// - isOpen: boolean to control visibility (for dynamic sidebar)
// - setIsOpen: function to close sidebar (for dynamic sidebar)
// - isStatic: boolean if true shows sidebar always (for main page)
const Sidebar = ({
    isOpen = false,
    setIsOpen = () => {},
    isStatic = false,
    textColor = "text-black",
    height = "auto",
  }) => {


    const [location, setLocation] = useState("");

    useEffect(() => {
      fetch("https://ipinfo.io/json?token=843a2ab4d34d13")
        .then((res) => res.json())
        .then((data) => {
          setLocation(`${data.city}, ${data.country}`);
        })
        .catch(() => {
          setLocation("Unknown location");
        });
    }, []);

  // If static, render normally
  if (isStatic) {
    return (
      <div className="hidden lg:block w-80 h-screen   text-left border-r border-gray-200 pt-5 text-sm">
        <ul className="flex flex-col align-center">
        {categories.map((item, index) => (
 <li
 key={index}
 className={`flex items-center pb-2 group rounded
   ${item.label === "Special Sale" ? "bg-yellow-200 pl-4 py-1 font-bold" : ""}
   ${item.label === "Chat With Us" ? " text-green-700 py-1 pl-10 font-semibold" : "pl-10"}
 `}
>
<img
  className={`w-6 h-6 transition duration-300
    ${item.label === "Chat With Us"
      ? "" 
      : "filter grayscale brightness-0 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100"
    }`
  }
  src={item.icon}
  alt={item.label}
/>
    <a
      href="#"
      className="block pl-2 pt-1 rounded hover:text-green-700"
    >
      {item.label}
    </a>
  </li>
))}


        </ul>
        
        <div className="flex items-center pl-9  gap-1 ">
          <img src="/location.svg" alt="" />
      <p className="text-sm text-gray-800">
        {location ? `${location}` : "Detecting location..."}
      </p>
    </div>

       


  


      <div className="p-4 mb-2">
    

<div className="flex flex-col items-center justify-center gap-2 border border-gray-300 rounded p-3">
<p className="text-xs text-gray-500 text-center">
Log in to receive recommendations, personal bonuses and discounts.
</p>
<button className="bg-[rgb(34,100,127)] hover:bg-[rgb(34,100,147)] text-white font-bold w-55 h-8 rounded cursor-pointer">
Log in
</button>

</div>


<div className="flex flex-col items-center justify-center gap-2 bg-gray-100 rounded p-3 my-4">
  <p className="text-md text-gray-500 text-center ">
  Subscribe and be the first to receive information about the start of sales, discounts, promotions, bonuses and welcome surprises at <Website className="com"></Website>!
  </p>
  <button className="bg-[rgb(34,100,127)] hover:bg-[rgb(34,100,147)] text-white font-bold py-2 px-5 rounded transition-colors duration-300 w-60">
  Subscribe
  </button>
</div>


          <div className="flex flex-col justify-center my-2 border-t border-b border-gray-200">
          <p className="text-md text-gray-700 pt-4 pl-10">Download our apps :</p>
          <div className="flex items-center justify-center   gap-2 mb-2 pl-2"> {/* reduced vertical spacing */}
      <a href="#">
        <img className="w-28 h-15" src="/applestore.png" alt="App Store" />
      </a>
      <a href="#">
        <img className="w-25 h-auto" src="/googlestore1.png" alt="Google Play" />
      </a>
    </div>
          </div>
          


 {/* Logo & About */}
 <div className="flex flex-col justify-center my-4 pb-4 gap-1 border-b border-gray-200">
          <p className="text-md text-gray-700 pl-10 ">Social Networks:</p>
          <div className="flex space-x-6 justify-center pb-2 pt-2">
        
      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="text-gray-400 hover:text-green-600 transition"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5v-2.3c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 3h-2.4v7A10 10 0 0 0 22 12z" />
        </svg>
      </a>

      {/* Twitter */}
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="text-gray-400 hover:text-green-600  transition"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 2-2.48 9 9 0 0 1-2.83 1.08 4.52 4.52 0 0 0-7.7 4.13A12.8 12.8 0 0 1 1.64 2.16a4.52 4.52 0 0 0 1.4 6 4.48 4.48 0 0 1-2-.56v.06a4.52 4.52 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2 .08 4.53 4.53 0 0 0 4.22 3.14A9.05 9.05 0 0 1 1 18.5 12.75 12.75 0 0 0 7 20c8.3 0 12.8-6.9 12.8-12.8 0-.2 0-.4 0-.6A9.14 9.14 0 0 0 23 3z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-gray-400 hover:text-green-600  transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 9.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-gray-400 hover:text-green-600  transition"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2a4 4 0 0 1 4-2zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>
      </a>
  
  </div>
    </div>




     {/* Categories */}
     <div className="pl-10 border-b border-gray-200 pb-12">
            <h3 className="text-white font-semibold mb-4 ">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-green-500 transition">Electronics</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Appliances</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Computers & Laptops</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Smartphones & Tablets</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Home & Garden</a></li>
            </ul>
          </div>
  
          {/* Customer Support */}
          <div className="pl-10 border-b border-gray-200 pb-12">


            <h3 className="text-white font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-green-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Payment Methods</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Contact Us</a></li>
            </ul>
          </div>
  
          {/* About Company & Social */}
          <div className="pl-10 border-b border-gray-200 pb-12">


            <h3 className="text-white font-semibold mb-4">About Website</h3>
            <ul className="space-y-4 text-sm mb-6">
              <li><a href="#" className="hover:text-green-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Terms of Service</a></li>
            </ul>
  

          </div>
  
        
       





















        </div>
      </div>

     
    
    );
  }

  // Dynamic sidebar for header: slide in/out from left
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-end p-4 border-b border-gray-300">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
          className="text-gray-700 hover:text-green-600"
        >
          ✕
        </button>
      </div>
      <ul className="flex flex-col p-4">
        {categories.map((item, index) => (
          <li key={index} className="flex items-center mb-4 group cursor-pointer">
            <img
              className="w-6 h-6 filter grayscale brightness-0 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition duration-300"
              src={item.icon}
              alt={item.label}
            />
            <a href="#" className="block pl-2 pt-1 rounded hover:text-green-600">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;