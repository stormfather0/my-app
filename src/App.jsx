import './App.css';
import Header from './Header';
import Products from './Products';
import Footer from './Footer';
import Checkout from './pages/Checkout';
import ProductDetails from "./ProductDetails.jsx";
import { Routes, Route } from 'react-router-dom';
import Account from './Account';

function App() {
  return (
    <>
      <Header />
      <div className=" min-h-screen">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />  {/* New route */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;