import { createSlice } from "@reduxjs/toolkit";

const threeSlice = createSlice({
  name: "Drag",
  initialState: {
    loading: true,
    progress: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setLoading, setProgress } = threeSlice.actions;

export default threeSlice.reducer;
