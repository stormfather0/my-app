import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "./slider/1.webp",
  "/slider/2.webp",
  "/slider/3.webp",
  "/slider/4.webp",
  "slider/5.webp",
  "./slider/6.webp",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [containerHeight, setContainerHeight] = useState("auto");
  const imgRef = useRef(null);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Update container height to match the image height (keeping full width)
  useEffect(() => {
    function updateHeight() {
      if (imgRef.current) {
        setContainerHeight(imgRef.current.clientHeight);
      }
    }
    // Update height on image load and window resize
    const currentImg = imgRef.current;
    if (currentImg && currentImg.complete) {
      updateHeight();
    } else {
      currentImg?.addEventListener("load", updateHeight);
    }
    window.addEventListener("resize", updateHeight);

    return () => {
      currentImg?.removeEventListener("load", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, [index]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      zIndex: 0,
    }),
  };

  return (
    <div
      className="relative w-full max-w-6xl overflow-hidden rounded-2xl mt-2"
      style={{ height: containerHeight }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Slide ${index}`}
          className="w-full object-contain"
          ref={imgRef}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 
                   w-10 h-10 flex items-center justify-center 
                   bg-gray-500 bg-opacity-40 hover:bg-opacity-60 
                   text-white rounded-full shadow cursor-pointer"
        aria-label="Previous slide"
      >
        ◀
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 
                   w-10 h-10 flex items-center justify-center 
                   bg-gray-500 bg-opacity-40 hover:bg-opacity-60 
                   text-white rounded-full shadow cursor-pointer"
        aria-label="Next slide"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 ">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}