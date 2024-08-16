import React, { useState, useEffect } from "react";
import CryptoList from "./CryptoList";
import CryptoCarousel from "./CryptoCarousel";

export default function CryptoDashboard() {
  const [carouselItems, setCarouselItems] = useState([]);

  // Load saved items from localStorage when the component mounts
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("carouselItems")) || [];
    setCarouselItems(savedItems);
  }, []);

  // Add a new item to the carousel and update localStorage
  const handleAddToCarousel = (crypto) => {
    if (!carouselItems.some((item) => item.id === crypto.id)) {
      const updatedItems = [...carouselItems, crypto];
      setCarouselItems(updatedItems);
      localStorage.setItem("carouselItems", JSON.stringify(updatedItems));
    }
  };

  return (
    <div>
      <CryptoCarousel carouselItems={carouselItems} />
      <CryptoList onAddToCarousel={handleAddToCarousel} />
    </div>
  );
}
