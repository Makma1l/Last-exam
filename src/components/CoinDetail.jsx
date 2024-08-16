import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";
import Buttons from "./Buttons";

export default function CoinDetail() {
  const { coinId } = useParams();
  const [coinDetail, setCoinDetail] = useState(null);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`
        );
        const data = await response.json();
        setCoinDetail(data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchCoinDetail();
  }, [coinId]);

  if (!coinDetail) return <div className="text-white">Loading...</div>;

  return (
    <div className=" flex mx-auto mt-[25px] flex-row">
      <aside className="w-[545px] h-[787px] border-r-2 border-[#808080]">
        <div className=" text-white p-4 rounded">
          <div className="flex  flex-col mb-4">
            <div className="flex flex-col items-center">
              <img
                src={coinDetail.image.large}
                alt={coinDetail.name}
                className="w-[200px] h-[200px]    "
              />
              <h1 className="text-white  text-[700] text-[48px] mb-8">
                {coinDetail.name} ({coinDetail.symbol.toUpperCase()})
              </h1>
            </div>
            <div className="mt-4 text-[400] text[16px] leading-[28px]">
              <p>{coinDetail.description.en.split(".")[0]}</p>
            </div>
            <div className="">
              <p className="text-[700] mb-[20px] mt-[20px] text-[24px]">
                Rank:{""}
                {coinDetail.market_cap_rank}
              </p>
              <p className=" text-[700] mb-[20px] text-[24px]">
                Current Price:{" "}
                {coinDetail.market_data.current_price.usd.toLocaleString(
                  undefined,
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </p>
              <p className=" text-[700] text-[24px]">
                Market Cap:{" "}
                {coinDetail.market_data.market_cap.usd.toLocaleString(
                  undefined,
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="w-[1292px] mx-auto">
        <LineChart />

        <Buttons/>
      </div>
    </div>
  );
}
