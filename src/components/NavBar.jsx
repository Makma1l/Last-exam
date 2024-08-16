import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currencySlice";
import { addToCarousel, removeFromCarousel } from "../../store/cryptoSlice"; 
import { Drawer, Button } from "flowbite-react";
import { Link } from "react-router-dom";


export default function NavBar() {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState([]);

  useEffect(() => {
    const savedCoins = JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSelectedCoins(savedCoins);

    savedCoins.forEach((coin) => {
      dispatch(addToCarousel(coin));
    });
  }, [dispatch]);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    dispatch(setCurrency(newCurrency));
  };

  const removeCoin = (coinId) => {
    const updatedCoins = selectedCoins.filter((coin) => coin.id !== coinId);
    setSelectedCoins(updatedCoins);
    localStorage.setItem("savedCoins", JSON.stringify(updatedCoins));

    dispatch(removeFromCarousel(coinId));
  };

  return (
    <div className="px-10">
      <div className="flex max-w-navbar h-16 items-center mx-auto">
        <Link to="/">
          <h1 className="font-monts text-[20px] font-[700] text-[#87CEEB]">
            CRYPTOFOLIO
          </h1>
        </Link>

        <select
          name="currency"
          id="currency"
          className="ml-auto w-[85px] h-[40px] bg-[#14161A] text-white border-none outline-none cursor-pointer"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="RUB">RUB</option>
          <option value="JPY">JPY</option>
        </select>

        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="ml-4 bg-[#87CEEB] text-black"
        >
          WATCH LIST
        </Button>

        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          position="right"
          className="bg-black"
        >
          <Drawer.Header title="WATCH LIST" />
          <Drawer.Items>
            {selectedCoins.length > 0 ? (
              selectedCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-2 border-b border-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={coin.image}
                      alt={`Logo of ${coin.name}`}
                      className="h-10 w-10 mr-2"
                    />
                    <div>
                      <div>{coin.symbol.toUpperCase()}</div>
                      <div className="text-xs text-gray-500">{coin.name}</div>
                    </div>
                  </div>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => removeCoin(coin.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No coins saved.</p>
            )}
          </Drawer.Items>
        </Drawer>
      </div>
    </div>
  );
}
