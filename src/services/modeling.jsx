import { createSlice } from "@reduxjs/toolkit";

const ModelSlice = createSlice({
  name: "Model",
  initialState: {
    appear: true,
    loading: false,
    Appear: false,
    first:false
  },
  reducers: {
    setAppear: (state, action) => {
      state.appear = action.payload;
    },
    setLoadingSecond: (state, action) => {
      state.loading = action.payload;
    },
    setAAppear: (state, action) => {
      state.Appear = action.payload;
    },
    setFirst:(state,action)=>{
      state.first=true;
    }
  },
});

export const { setAppear, setLoadingSecond, setAAppear,setFirst } = ModelSlice.actions;

export default ModelSlice.reducer;
