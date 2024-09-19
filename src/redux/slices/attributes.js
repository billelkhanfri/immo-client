import { createSlice } from "@reduxjs/toolkit";

const referralAttributesSlice = createSlice({
  name: "attributes",
  initialState: {
    attributes: [], // Initialized as an empty array
    attribute: null,
  },

  reducers: {
   
    getAllReferralAttributes(state, action) {
      state.attributes = action.payload;
    },
 
  
  },
});

const referralAttributesReducer = referralAttributesSlice.reducer;
const referralAttributesActions = referralAttributesSlice.actions;

export { referralAttributesReducer, referralAttributesActions };