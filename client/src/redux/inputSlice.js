import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "inputs",
  initialState: {
    inputs: [],
  },
  reducers: {
    setInputFields: (state, action) => {
      state.inputs = action.payload;
    },
  },
});

export const { setInputFields } = inputSlice.actions;

export default inputSlice.reducer;
