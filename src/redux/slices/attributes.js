import { createSlice } from "@reduxjs/toolkit";

const referralAttributesSlice = createSlice({
  name: "attributes",
  initialState: {
    attributes: [], // Array to hold all referral attributes
    attribute: [], // Variable to hold a single referral attribute
  },

  reducers: {
    // Action to set all referral attributes
    getAllReferralAttributes(state, action) {
      state.attributes = action.payload;
    },

    // Action to set a single referral attribute
    getAttributeById(state, action) {
      state.attribute = action.payload;
    },
    
    // Optionally, you can add more reducers here for additional functionality
  },
});

// Export the reducer and actions
const referralAttributesReducer = referralAttributesSlice.reducer;
const referralAttributesActions = referralAttributesSlice.actions;

export { referralAttributesReducer, referralAttributesActions };
