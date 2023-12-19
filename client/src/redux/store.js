import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./inputSlice";

const store = configureStore({
  reducer: {
    inputs: inputSlice,
  },
});

export default store;
