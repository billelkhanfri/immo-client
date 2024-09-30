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
    
  // Action to update a single referral attribute
updateAttributeStatus(state, action) {
  const { id, status } = action.payload;

  // Find the attribute by its id
  const attributeIndex = state.attributes.findIndex(
    (attribute) => attribute.id === id
  );

  // If the attribute exists, update its status
  if (attributeIndex !== -1) {
    state.attributes[attributeIndex].status = status;
  }
}

  },
});

// Export the reducer and actions
const referralAttributesReducer = referralAttributesSlice.reducer;
const referralAttributesActions = referralAttributesSlice.actions;

export { referralAttributesReducer, referralAttributesActions };
