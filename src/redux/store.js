import { configureStore } from "@reduxjs/toolkit";
import { getProductReducer } from "./productReducer/getProductReducer";
import { cartReducer } from "./cartReducer/cartReducer";
import { signInReducer } from "./signInReducer/signInReducer";
import { orderReducer } from "./orderReducer/orderReducer";

export let store = configureStore({
  reducer: { getProductReducer, cartReducer, signInReducer, orderReducer },
});
