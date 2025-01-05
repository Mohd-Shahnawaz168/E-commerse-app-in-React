import { createSlice } from "@reduxjs/toolkit";

let INITIALSTATE = {
  signIn: true,
};

let signInSlice = createSlice({
  name: "SignIn",
  initialState: INITIALSTATE,
  reducers: {
    signIn: (state, action) => {
      state.signIn = true;
    },
    logOut: (state, action) => {
      state.signIn = false;
    },
  },
});

let signInReducer = signInSlice.reducer;
let signInAction = signInSlice.actions;
let signInSelector = (state) => state.signInReducer;

export { signInReducer, signInAction, signInSelector };
