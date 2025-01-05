import { createSlice } from "@reduxjs/toolkit";

let INITIALSTATE = {
  products: [],
};
let getProductSlice = createSlice({
  name: "products",
  initialState: INITIALSTATE,
  reducers: {
    getProduct: (state, action) => {
      state.products = [...action.payload];
    },
  },
});

let getProductReducer = getProductSlice.reducer;
let getProductActions = getProductSlice.actions;

let getProductSelector = (state) => state.getProductReducer;

export { getProductReducer, getProductActions, getProductSelector };
