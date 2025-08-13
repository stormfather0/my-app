import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "./CartContext";
// import { div, img } from "framer-motion/client";
// import { motion } from "framer-motion";


const FAV_STORAGE_KEY = "myAppFavourites";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const [similarProducts, setSimilarProducts] = useState([]);

  const imageWrapperRef = useRef(null);
  const interestedSectionRef = useRef(null);
  const reviewsRef = useRef(null);

  const [showBottomBar, setShowBottomBar] = useState(false);


  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [ratingCount, setRatingCount] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
 const [leaveReview, setLeaveReview] = useState(false);


 const [votes, setVotes] = useState({});
 const [activeTab, setActiveTab] = useState("reviews"); 

  const scrollToRefWithOffset = (ref, offset = 80) => {
    if (!ref?.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToInterested = () => scrollToRefWithOffset(interestedSectionRef);
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollToReviews = () => scrollToRefWithOffset(reviewsRef); 


  const [isStickyActive, setIsStickyActive] = useState(true);


//Popup window that appears on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500;
      const isPastThreshold = window.scrollY > scrollThreshold;
  
      setShowBottomBar(isPastThreshold);
    };
  
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array to run only on mount/unmount







  //Get tomorrow's date for delivery 
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);


  
  const formatted = tomorrow.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  //Sale End Date 
const saleEndDate = new Date();
saleEndDate.setDate(saleEndDate.getDate() + 21);
const saleEndDateFormated = saleEndDate.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
});





  useEffect(() => {
    if (!product?.category) return;
  
    fetch(`https://dummyjson.com/products/category/${encodeURIComponent(product.category)}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out the current product from results
        const filtered = data.products.filter((p) => p.id !== product.id);
        setSimilarProducts(filtered);
 
      })
      .catch((err) => console.error("Failed to load similar products:", err));
  }, [product?.category]);

  // Favourites state (load from localStorage)
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  

// Get rating distribution for Reviews
  const getRatingDistribution = (reviews) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
    reviews.forEach((review) => {
      const rating = Math.floor(review.rating);
      if (distribution[rating] !== undefined) {
        distribution[rating]++;
      }
    });
  
    return distribution;
  };

  // Save favourites on every change
  useEffect(() => {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // Check if current product is favourited
  const isFavourited = product ? favourites.includes(product.id) : false;


    // Check if user is eligible for free delivery 
    const isFreeDelivery = product?.price > 50;


  // Toggle favourite
  const toggleFavourite = () => {
    if (!product) return;
    setFavourites((prev) =>
      prev.includes(product.id)
        ? prev.filter((pid) => pid !== product.id)
        : [...prev, product.id]
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setRatingCount(getRatingDistribution(data.reviews || [])); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!product) return null;

  return (
    
    <div className="bg-gray-100 max-w-8xl mx-auto rounded-xl gap-4 px-10 py-5">
  <div className="p-1 h-7 rounded-lg mb-2 flex items-center gap-x-1">
  <img className="w-4 h-4" src="/my-app/home.png" alt="Home" />
  <span >/</span>
  <p className="text-sm pl-1 tracking-wider">{product.category}</p>
</div>
<div  className="p-1 rounded-lg bg-white mb-2 "> 
  <ul className="flex gap-2 ml-5 text-sm">
  
    <li 
    onClick={scrollToTop}
    className="p-1 border-b-2 border-green-600  cursor-pointer scroll-mt-20">About this item</li>
<li
  onClick={scrollToInterested}
  className="p-1 border-b-2 border-transparent hover:border-green-600 cursor-pointer"
>
  Similar items
</li>
    <li 
     onClick={scrollToReviews}
    className="p-1 border-b-2 border-transparent hover:border-green-600 cursor-pointer">Answers</li>

  </ul>
</div>

      <div className="flex flex-col md:flex-row gap-3 items-start">
    
      <div
  ref={imageWrapperRef}
  className="relative w-full md:w-3/5 flex items-center justify-center bg-white rounded-lg max-h-[500px] overflow-hidden lg:sticky lg:top-[70px] z-10"
  style={{
    position: window.innerWidth >= 1024 && isStickyActive ? "sticky" : "relative",
    top: window.innerWidth >= 1024 && isStickyActive ? "70px" : "auto",
    zIndex: 10,
  }}
>
  <img
    src={product.images[currentImageIndex]}
    alt={product.title}
    className="object-contain max-h-[500px] w-full"
    loading="eager"
  />
  {product.images.length > 1 && (
    <>
      <button
        onClick={handlePrevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700 w-10 h-10 flex items-center justify-center"
      >
        ◀
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700 w-10 h-10 flex items-center justify-center"
      >
        ▶
      </button>
    </>
  )}
</div>

        {/* Details */}
        <div className="flex flex-col flex-grow md:w-3/5 text-gray-700 text-lg text-left">
        <div className=" rounded-lg bg-white mb-1 flex justify-between">

       
  {/* Left: Title */}
  <div className="flex flex-col items-start gap-1 p-3">
  <p className="text-2xl font-extrabold text-gray-900">{product.title}

  </p>
  <div className="flex items-center gap-2 ">
            <p>
              <StarRating rating={product.rating} />
            </p>
            <p onClick={scrollToReviews}  className="text-sky-700 text-base cursor-pointer">
              {product.totalReviews ?? product.stock} reviews
            </p>
          </div>
          </div>
  


  {/* Right: Leave a review + barcode */}
  <div className="flex flex-col items-start justify-end p-2 pr-4">
    <a href="#">
    <p  onClick={scrollToReviews} className="text-sm text-blue-400 ">Leave a review</p>
    </a>
    <p className="text-sm text-gray-500 opacity-75">barcode: {product.meta.barcode}</p>
  </div>


</div>

<Link to="#" className="block">
<div className="p-2 rounded-lg bg-white mb-1 cursor-pointer">

  <div className="border-1 rounded border-gray-200 p-2 gap-4 flex justify-between items-center ">
    <div className="flex items-center gap-2">
  <img className="w-13 h-13" src="/my-app/sale.png" alt="" />
  
  <div >

    <p className="text-sm font-bold">Big Sale — Up to 50% Off! Limited Time Only!</p>
    <p className="text-sm text-gray-500">Only until {saleEndDateFormated}</p>
    </div>
    </div>
  
    <a href="#">
    <img className="w-4 h-4" src="/my-app/right-arrow.png" alt="" />
    </a>
    </div>
  </div>
  </Link>

      

          <div className="flex px-4 py-0 rounded-t-lg bg-white gap-3 items-center border-b border-gray-200">
            <p className="text-base text-gray-500">Seller:</p>
            <img src="/my-app/seller.svg" alt="" className="w-35 h-10" />
          </div>







          <div className="flex flex-col xl:flex-row px-4 py-1 rounded-b-lg bg-white gap-4 xl:items-center xl:justify-between">
  {/* Top Row: Price + Favourite + inline buttons (visible only xl+) */}
  <div className="flex justify-between xl:justify-start items-center w-full gap-5">
    <div className="flex flex-col text-base gap-0">
      <p
        className={
          product.availabilityStatus === "In Stock"
            ? "text-green-600"
            : "text-red-500"
        }
      >
        {product.availabilityStatus}
      </p>
      <p className="font-medium text-gray-900 text-2xl">${product.price}</p>
    </div>

    {/* Inline buttons: only show on xl+ */}
    <div className="hidden xl:flex gap-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md"
        onClick={() => addToCart(product)}
      >
       
<span className="flex text-sm px-5 cursor-pointer">Add to Cart</span>
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 border border-green-600 h-9 hover:bg-gray-100 text-green-600 px-5 py-2 rounded-lg shadow-md cursor-pointer"
      >
        Buy on credit
      </button>
    </div>

    {/* Favourite toggle button */}
    <button
      onClick={toggleFavourite}
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
      title={isFavourited ? "Remove from favourites" : "Add to favourites"}
      className="w-8 h-8 text-red-500 hover:text-red-700 transition cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavourited ? "orange" : "none"}
        stroke="orange"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
      >
        <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" />
      </svg>
    </button>
  </div>

  {/* Second Row: stacked buttons only visible below xl */}
  <div className="flex flex-col gap-2 w-full xl:hidden">
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md"
      onClick={() => addToCart(product)}
    >
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="..." />
      </svg>
      <span className="text-sm">Add to Cart</span>
    </button>

    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 border border-green-600 h-9 hover:bg-gray-100 text-green-600 px-5 py-2 rounded-lg shadow-md"
    >
      Buy on credit
    </button>
  </div>
</div>

          <div className="flex items-start p-4 rounded-lg bg-white mb-1 mt-2 gap-2">
            <img src="/my-app/wallet.svg" alt="" className="w-7 h-7" />
            <p className="text-gray-600 text-sm">
              Payment. By card online, Payment upon receipt of goods, Payment by
              card in the branch, Apple Pay, Google Pay, Cashless for legal
              entities, Cashless for individuals, Visa, Mastercard
            </p>
          </div>

            <div className="flex items-center p-4 rounded-lg bg-white mb-1 mt-1 gap-2">
              <img src="/my-app/security.svg" alt="" className="w-7 h-7" />

              <p className="text-gray-600 text-sm">
                Warranry information: <strong> {product.warrantyInformation}</strong>
              </p>
            </div>

         




          <div className="p-4 rounded-lg bg-white mb-2 mt-2">
  {/* Header */}
  <div className="flex items-center gap-2 mb-4">
    <img src="/my-app/delivery.svg" alt="Delivery Icon" className="w-6 h-6" />
    <p className="text-gray-700 text-sm font-medium">Delivery Options</p>
  </div>

  {/* Delivery Methods */}
  <div className="flex flex-col gap-3 w-full">
    
    {/* Shared row style */}
    {[
      { img: '/my-app/ups-1.png', label: 'UPS', price: 'Free' },
      { img: '/my-app/courier.png', label: 'Courier', price: '$10' },
      { img: '/my-app/dhl.svg.png', label: 'DHL', price: '$8' },
      { img: '/my-app/fedex.png', label: 'FedEx', price: '$9' },
    ].map(({ img, label, price }, index) => (
      <div
        key={index}
        className="flex items-center justify-between border-b border-gray-200 pb-2"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 flex justify-center">
            <img className="h-6 object-contain" src={img} alt={label} />
          </div>
          <p className="text-green-600 text-sm">
            Receive your order on <b>{formatted}</b>
          </p>
        </div>


        <p className={`text-sm font-medium${  isFreeDelivery ? "text-green-600" : "text-gray-600"
  }`} >{isFreeDelivery ? "Free" : price}
</p>


      </div>

    
    ))}
  </div>
</div>


<div className="p-4 rounded-lg bg-white  mt-2">
  <div className="flex gap-2 items-center mb-4">
    <img className="w-6 h-6" src="/my-app/service.svg" alt="" />
    <p className="text-gray-700 text-sm font-medium">Additional Services</p>
  </div>

  <div className="flex flex-col gap-3 pl-8">

    <label className="flex items-center gap-5 text-sm text-gray-700">
    <img className="w-12 h-12 object-contain" src="/my-app/additional-services-1.png.webp" alt="" />
      <input type="checkbox" className="accent-green-600 w-4 h-4" />
      Additional guarantee for 1 year
    </label>

    <label className="flex items-center gap-5 text-sm text-gray-700">
    <img className="w-12 h-12 object-contain" src="/my-app/additional-services-2.png.webp" alt="" />

      <input type="checkbox" className="accent-green-600 w-4 h-4" />
     Service for unexpected breakdowns
    </label>

    <label className="flex items-center gap-5 text-sm text-gray-700">
    <img className="w-12 h-12 object-contain" src="/my-app/additional-services-3.png.webp" alt="" />

      <input type="checkbox" className="accent-green-600 w-4 h-4" />
      NEW! Full guarantee for 2 years
    </label>
  </div>
</div>


<a href="#">
<div className="flex items-center justify-center p-4 rounded-lg bg-white mb-1 mt-1 gap-2">
       

       <p className="text-gray-600 text-sm">
       Similar items
       </p>
       <img className="w-4 h-4" src="/my-app/right-arrow.png" alt="" />
     </div>
     </a>









        </div>
      </div>

      










    
    
  



{/* You can also be interested in: */}

{showBottomBar && (
  <div className="fixed flex justify-between items-center gap-4  px-5 bottom-0 left-0 w-full bg-white text-black text-center z-50 shadow-lg">
<div className="flex  items-center gap-2">
<img className="w-16 h-16 object-contain" src={product.thumbnail} alt={product.title} />
<p>{product.title}</p>
</div>
<div className="flex items-center gap-5">
<button
              onClick={toggleFavourite}
              aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
              title={isFavourited ? "Remove from favourites" : "Add to favourites"}
              className="w-8 h-8 text-red-500 hover:text-red-700 transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill={isFavourited ? "orange" : "none"}
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" />
              </svg>
            </button>

<button
              type="button"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
              onClick={(e) => {
                addToCart(product);
              }}
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11 21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078 15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884 6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18 13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906 10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489 17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938 20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938 8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617 20Z"
                />
              </svg>
              <span className="text-sm ">Add to Cart</span>
            </button>
            </div>



  </div>
)}



{similarProducts.length > 0 && (
  <div ref={interestedSectionRef} id="interested" className="p-4 rounded-lg bg-white mb-5 mt-7 pb-10">
  
    <h2 className="text-lg font-semibold text-gray-800 mb-3 text-left ">
      You can also be interested in:
    </h2>
    <div className="flex overflow-x-auto gap-4">
      {similarProducts.slice(0, 10).map((item) => (
        <div
          key={item.id}
          className="min-w-[200px] flex-shrink-0 border rounded-lg shadow-sm p-3 bg-white hover:shadow-md transition"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-32 w-full object-contain rounded-md mb-2 mx-auto"
          />
          <p className="text-sm font-semibold text-gray-900 break-words w-60">
            {item.title}
          </p>
          <p className="text-green-600 font-bold">${item.price}</p>
        </div>
      ))}
    </div>
  </div>
)}







   
{/* Reviews */}
<div className="p-4 rounded-lg bg-white mb-1 mt-6 min-h-[550px]" ref={reviewsRef} id="reviews">
  <div className="flex flex-col md:flex-row gap-4">
    
    {/* Left side - heading */}
    <div className="md:w-1/3 flex flex-col items-start p-2">
      <h3 className="text-xl font-semibold mb-5">Reviews</h3>

      <div className="flex items-center gap-2">
        <h2 className="text-md font-semibold rounded-lg">
          Customers score: {product.rating} / 5
        </h2>
        <img className="w-4 h-4" src="/my-app/star.svg" alt="star" />
      </div>

      <p className="text-gray-600 text-sm mb-2">
        Based on <strong>{product.reviews.length}</strong> reviews
      </p>

      <div className="flex flex-col items-start mt-4 w-full">
        <h3 className="text-lg font-semibold mb-2">Customer Ratings</h3>

        <ul className="text-sm text-gray-700 space-y-2 w-full max-w-68">
          {Object.entries(ratingCount)
            .sort((a, b) => b[0] - a[0])
            .map(([star, count]) => {
              const percentage = Math.min((count / 10) * 100, 100);
              return (
                <li key={star} className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-1 min-w-[30px]">
                    <span className="font-bold">{star}</span>
                    <img src="/my-app/star.svg" alt={`${star} star`} className="w-4 h-4" />
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-orange-300 rounded"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{count}</span>
                </li>
              );
            })}
        </ul>

        {/* Leave Review Button */}
        <div className="w-full flex justify-start mt-4">
          <button
            type="button"
            className="inline-flex justify-center items-center w-64 h-9 border border-green-600 hover:bg-gray-100 text-green-600 text-sm font-medium rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            onClick={() => setLeaveReview(true)}
          >
            Leave a review
          </button>

          {leaveReview && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                <button
                  onClick={() => setLeaveReview(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-200"
                >
                  ✖
                </button>
                <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  rows="4"
                  placeholder="Write your review..."
                />
                <button
                  onClick={() => setLeaveReview(false)} // replace with submit logic
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Right side - reviews/questions content */}
    <div className="flex-1">
      <div className="flex justify-start gap-3 mb-4">
        <button
          className={`border p-2 rounded-lg text-sm cursor-pointer ${
            activeTab === "reviews" ? "bg-green-100 text-green-700 border-green-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({product.reviews.length})
        </button>
        <button
          className={`border p-2 rounded-lg text-sm cursor-pointer ${
            activeTab === "questions" ? "bg-green-100 text-green-700 border-green-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
      </div>

      {activeTab === "reviews" ? (
        product.reviews && product.reviews.length > 0 ? (
          product.reviews.slice(0, visibleReviews).map((review, i) => (
            <div key={i} className="flex justify-end mb-3">
              <div className="border border-gray-300 rounded-2xl pb-2 pt-2 px-4 w-full text-left">
                <div className="flex items-center gap-2">
                  <p className="text-gray-700">
                    <strong>{review.reviewerName || "Anonymous"}:</strong>
                  </p>
                  <img src="/my-app/cart-reviews.svg" alt="review icon" className="w-6 h-6" />
                  <p className="text-gray-500 text-sm">{formatDate(review.date)}</p>
                </div>
                <p className="text-yellow-500 mb-5">
                  <StarRating rating={review.rating} />
                </p>
                <p>{review.comment}</p>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2 mt-2">
                    <img className="w-5 h-5 -scale-x-100" src="/my-app/reply-arrow.svg" alt="reply" />
                    <p className="text-gray-500 text-sm cursor-pointer">Reply</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className="w-5 h-5 cursor-pointer"
                      src="/my-app/like.svg"
                      alt="Upvote"
                      onClick={() =>
                        setVotes(prev => ({
                          ...prev,
                          [i]: {
                            up: (prev[i]?.up || 0) + 1,
                            down: prev[i]?.down || 0,
                          },
                        }))
                      }
                    />
                 <span className="mr-3">{votes[i]?.up || 0}</span>
              
                    <img
                      className="w-5 h-5 rotate-180 cursor-pointer"
                      src="/my-app/like.svg"
                      alt="Downvote"
                      onClick={() =>
                        setVotes(prev => ({
                          ...prev,
                          [i]: {
                            up: prev[i]?.up || 0,
                            down: (prev[i]?.down || 0) + 1,
                          },
                        }))
                      }
                    />
                 <span>{votes[i]?.down || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )
      ) : (
        <div className="flex flex-col gap-2 border border-gray-300 rounded-2xl pb-2 pt-2 px-4"> 
        <div className="flex items-center gap-4">
          <div> <img src="/my-app/reviews-question.svg" alt="No questions" />  
          </div>
       <div className="flex flex-col items-start"> 
          <p className="text-gray-500 py-1">No questions yet.</p>
       <p className="text-gray-500 text-sm pb-6">Want to know more? Ask a question about the product</p>
        <button className="w-60 bg-white text-green-700 px-3 py-2 cursor-pointer rounded-lg hover:bg-green-100 border border-green-700">Ask a question</button>
        </div>
        </div>
      </div>
      )}
    </div>
  </div>
</div>
    </div>

  
  );
}

// StarRating component as you provided
function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const maxStars = 5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className="w-4 h-4 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.782 1.4 8.166L12 18.897l-7.334 3.86 1.4-8.166L.132 9.209l8.2-1.191z" />
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg key="half" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="lightgray" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-grad)"
          d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.782 1.4 8.166L12 18.897l-7.334 3.86 1.4-8.166L.132 9.209l8.2-1.191z"
        />
      </svg>
    );
  }

  const remaining = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        className="w-4 h-4 text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.782 1.4 8.166L12 18.897l-7.334 3.86 1.4-8.166L.132 9.209l8.2-1.191z" />
      </svg>
    );
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
}

function formatDate(isoDate) {
  if (!isoDate) return "Unknown date";
  const date = new Date(isoDate);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(",", "");
}