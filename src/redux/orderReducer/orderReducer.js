import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig/fireBaseConfig";

let INITIALSTATE = {
  orders: [],
};

let getAllOrder = createAsyncThunk("getAllOrder", (payload, THUNKAPI) => {
  let unsub = onSnapshot(collection(db, "Orders"), (onsnap) => {
    let ordered = [];
    onsnap.forEach((doc) => {
      ordered.push(doc.data());
    });
    THUNKAPI.dispatch(orderAction.getAllOrder(ordered));
  });
});

let orderSlice = createSlice({
  name: "orders",
  initialState: INITIALSTATE,
  reducers: {
    getAllOrder: (state, action) => {
      state.orders = action.payload;
      //state.orders = [...action.payload];
    },
  },
});

let orderReducer = orderSlice.reducer;
let orderAction = orderSlice.actions;
let orderSelector = (state) => state.orderReducer;

export { orderReducer, orderAction, orderSelector, getAllOrder };
