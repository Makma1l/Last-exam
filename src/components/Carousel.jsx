import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "flowbite-react";

export default function CryptoCarousel() {
  const carouselItems = useSelector((state) => state.crypto.carouselItems);
  const selectedCurrency = useSelector((state) => state.currency);

  const chunkedItems = [];
  for (let i = 0; i < carouselItems.length; i += 4) {
    chunkedItems.push(carouselItems.slice(i, i + 4));
  }

  return (
    <div
      className="relative h-[400px] sm:h-80 xl:h-96 2xl:h-108 bg-cover bg-center"
      style={{
        backgroundImage: "url('/97f154adfd88d0e48d9a7fc87e5ab035.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 text-center p-4">
        <h1 className="text-[#87CEEB] text-[40px] sm:text-[50px] xl:text-[60px] leading-tight tracking-wide font-bold pt-4">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="text-[#A9A9A9] text-[500] mt-2 text-[14px]">
          Get All The Info Regarding Your Favorite Crypto Currency
        </p>
      </div>
      <Carousel
        indicators={false}
        controls={false}
        className="relative z-20 h-[400px]"
        leftControl="none"
        rightControl="none"
      >
        {chunkedItems.map((chunk, index) => (
          <div
            key={index}
            className="flex h-full pt-28 items-center justify-center space-x-72 bg-transparent"
          >
            {chunk.map((item, idx) => (
              <div key={idx} className="flex ml flex-col items-center">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="w-[80px] h-[80px] mb-2"
                />
                <p className="text-white font-semibold inline-block text-lg sm:text-xl">
                  {item.symbol.toUpperCase()}
                </p>
                <p
                  className={`text-${
                    item.price_change_percentage_24h >= 0
                      ? "green-500"
                      : "red-500"
                  } text-lg sm:text-xl`}
                >
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="text-white text-lg sm:text-xl">
                  {item.current_price.toLocaleString(undefined, {
                    style: "currency",
                    currency: selectedCurrency || "USD",
                  })}
                </p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
