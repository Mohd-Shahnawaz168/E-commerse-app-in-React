import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig/fireBaseConfig";
import { addDoc, collection } from "firebase/firestore";

let addProductInCart = createAsyncThunk(
  "addProductInCart",
  async (payload, ThunkApi) => {
    let product = { ...payload, qty: 1 };
    let cartRef = collection(db, "Cart");
    await addDoc(cartRef, product);
  }
);

let initialState = {
  cart: [],
};

let orderSlice = createSlice({
  name: "Carts",
  initialState: initialState,
  reducers: {
    getAllOrdera: (state, action) => {
      state.cart = action.payload;
    },
  },
});

let cartReducer = orderSlice.reducer;
let cartAction = orderSlice.actions;
let cartSelector = (state) => state.cartReducer;

export { cartReducer, cartAction, cartSelector, addProductInCart };
