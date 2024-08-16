import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carouselItems: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    addToCarousel: (state, action) => {
      const crypto = action.payload;
      if (!state.carouselItems.some((item) => item.id === crypto.id)) {
        state.carouselItems.push(crypto);
      }
    },
    removeFromCarousel: (state, action) => {
      const coinId = action.payload;
      state.carouselItems = state.carouselItems.filter(
        (item) => item.id !== coinId
      );
    },
  },
});

export const { addToCarousel, removeFromCarousel } = cryptoSlice.actions;

export default cryptoSlice.reducer;
