import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: null,
  },
  reducers: {
    getRatingById(state, action) {
      state.rating = action.payload;
    },
    addRating(state, action) {
      state.rating.post(action.payload);
    },
    updateRating(state, action) {
      const index = state.rating.findIndex(
        (ref) => ref.id === action.payload.id
      );
      if (index !== -1) {
        state.rating[index] = action.payload;
      }
    },
    deleteRating(state, action) {
      state.rating = state.rating.filter((ref) => ref.id !== action.payload.id);
    },
  },
});
$;
const ratingReducer = ratingSlice.reducer;
const ratingActions = ratingSlice.actions;
export { ratingActions, ratingReducer };
