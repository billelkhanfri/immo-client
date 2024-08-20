import { createSlice } from "@reduxjs/toolkit";

const referralSlice = createSlice({
  name: "referrals",
  initialState: {
    referrals: null,
    referral: null,
  },
  reducers: {
    getAllReferrals(state, action) {
      state.referrals = action.payload;
    },
    getReferral(state, action) {
      state.referral = action.payload;
    },
    createReferral(state, action) {
      state.referrals.push(action.payload);
    },
    updateReferral(state, action) {
      const index = state.referrals.findIndex(
        (ref) => ref.id === action.payload.id
      );
      if (index !== -1) {
        state.referrals[index] = action.payload;
      }
    },
    deleteReferral(state, action) {
      state.referrals = state.referrals.filter(
        (ref) => ref.id !== action.payload.id
      );
    },
  },
});

const referralReducer = referralSlice.reducer;
const referralActions = referralSlice.actions;
export { referralActions, referralReducer };
