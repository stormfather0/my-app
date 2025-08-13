export default function Footer() {
    return (
  

  
      <footer className="bg-gray-900 text-gray-300 ">
     <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 mx-auto p-10 mt-20 space-y-4 md:space-y-0 md:space-x-6 ">
  <p className="text-center md:text-left text-gray-700 flex-1 text-sm md:text-base max-w-4xl ">
    Subscribe and be the first to receive information about the start of sales, discounts, promotions, bonuses and welcome surprises at Wabsite.com!
  </p>
  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded transition-colors duration-300">
    Subscribe
  </button>
</div>
            <div className="mx-auto h-1 bg-green-600 py-0.1 px-6 mb-5"> 

            </div>
       
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pl-2 place-items-center">
          
          {/* Logo & About */}
          <div>
          <p className="text-sm color-gray-00 mt-6 mb-2">Social Networks</p>
          <div className="flex space-x-6 justify-center mb-2">
        
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
    <div className="flex space-x-4 items-center justify-center mb-4">
      <a href="#">
  <img className="w-20 h-20" src="/my-app/apps-banner-qr.png" alt="QR Code" />
  </a>

    <div className="flex flex-col space-y-0.5"> {/* reduced vertical spacing */}
      <a href="#">
        <img className="w-30 h-auto" src="/my-app/applestore.png" alt="App Store" />
      </a>
      <a href="#">
        <img className="w-30 h-auto" src="/my-app/googlestore1.png" alt="Google Play" />
      </a>
    </div>
  </div>
       

    
            <p className="text-gray-400 text-sm max-w-xs">
              Website.com is your trusted online store, offering a wide range of electronics, household items, and more — with fast delivery and great prices.
            </p>
          </div>
  
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition">Electronics</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Appliances</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Computers & Laptops</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Smartphones & Tablets</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Home & Garden</a></li>
            </ul>
          </div>
  
          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Payment Methods</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Contact Us</a></li>
            </ul>
          </div>
  
          {/* About Company & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">About website.com</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="#" className="hover:text-green-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Terms of Service</a></li>
            </ul>
  

          </div>
  
        </div>
  
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          <div className="flex justify-center mb-2">
          <p>Powered:</p>
          <img src="/my-app/visa-logo.svg" alt="visa" />
          <img src="/my-app/mastercard-logo.svg" alt="mastercard" />
          </div>
          &copy; {new Date().getFullYear()} Website.com. All rights reserved.
        </div>
      </footer>
    );
  }