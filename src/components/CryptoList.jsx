import React, { useState, useEffect } from "react";
import { Table, Pagination } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCarousel, removeFromCarousel } from "../../store/cryptoSlice";
import { FaEye as EyeIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import CarouselSide from "./Carousel";
export default function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoins, setSelectedCoins] = useState([]);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);


const customTheme = {
  base: "",
  layout: {
    table: {
      base: "text-sm bg-black text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      active:
        "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
};

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, [currency, currentPage]);

  useEffect(() => {
    const savedCoins = JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSelectedCoins(savedCoins);
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const toggleCoin = (coin) => {
    let updatedCoins = [...selectedCoins];
    const coinIndex = updatedCoins.findIndex((c) => c.id === coin.id);

    if (coinIndex !== -1) {
      updatedCoins.splice(coinIndex, 1);
      dispatch(removeFromCarousel(coin.id));
    } else {
      updatedCoins.push(coin);
      dispatch(addToCarousel(coin));
    }

    setSelectedCoins(updatedCoins);
    localStorage.setItem("savedCoins", JSON.stringify(updatedCoins));
  };

  const paginatedCryptos = filteredCryptos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" mx-auto mt-4">
      <CarouselSide />
      <div className="w-[1280px] mt-2 mx-auto">
        <div className="mb-4">
          <h1 className="text-white text-center text-[400] text-[34px]  mb-8">Cryptocurrency Prices by Market Cap</h1>
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-[#16171A] text-white border border-gray-700 rounded"
          />
        </div>

        <Table className="table-fixed w-full bg-[#16171A] text-white">
          <Table.Head className="bg-[#87CEEB] h-[56px] hover:bg-gray-800 text-black">
            <Table.HeadCell className="text-center bg-[#87CEEB] w-1">
              Coin
            </Table.HeadCell>
            <Table.HeadCell className="text-center bg-[#87CEEB] w-1/12">
              Price
            </Table.HeadCell>
            <Table.HeadCell className="text-center bg-[#87CEEB] w-1/6">
              24h
            </Table.HeadCell>
            <Table.HeadCell className="text-center bg-[#87CEEB] w-1/6">
              Market Cap
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {paginatedCryptos.map((coin) => (
              <Table.Row key={coin.id}>
                <Table.Cell className="text-center h-[93px]">
                  <div className="flex items-center">
                    <Link
                      to={`/about/${coin.id}`}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                      />
                      <div>
                        <div className="font-semibold">
                          {coin.symbol.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500">{coin.name}</div>
                      </div>
                    </Link>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center">
                  {coin.current_price.toLocaleString(undefined, {
                    style: "currency",
                    currency: currency || "USD",
                  })}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div className="flex items-center justify-center">
                    <EyeIcon
                      className={`cursor-pointer ${
                        selectedCoins.some((c) => c.id === coin.id)
                          ? "text-[#75F94C]"
                          : "text-gray-400"
                      }`}
                      onClick={() => toggleCoin(coin)}
                    />
                    <span
                      className={`ml-2 ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center">
                  {coin.market_cap.toLocaleString(undefined, {
                    style: "currency",
                    currency: currency || "USD",
                  })}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Pagination
          theme={customTheme}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(filteredCryptos.length / itemsPerPage)}
          showIcons={true}
          className="m-auto my-[28px] ml-[35%]"
        />
      </div>
    </div>
  );
}
