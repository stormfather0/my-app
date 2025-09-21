import './App.css';
import Header from './Header';
import Products from './Products';
import Footer from './Footer';
import Checkout from './pages/Checkout';
import ProductDetails from "./ProductDetails.jsx";
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { useEffect } from 'react'; 
import Account from './Account';
import ScrollToTop from './ScrollToTop';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Default background
    document.body.className = "bg-white";  

    // Change depending on route
    if (location.pathname === "/checkout" || location.pathname === "/account") {
      document.body.className = "bg-gray-50";
    }
  }, [location]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;