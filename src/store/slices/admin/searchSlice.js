import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "", // ✅ Ensure search state exists
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload; // ✅ Update search state
    },
  },
});

export const { setSearchQuery } = searchSlice.actions; // ✅ Export action
export default searchSlice.reducer;
