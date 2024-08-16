import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice"; 
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    currency: currencyReducer,
  },
});

export default store;
