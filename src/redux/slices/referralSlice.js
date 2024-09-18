import { createSlice } from "@reduxjs/toolkit";

const referralSlice = createSlice({
  name: "referrals",
  initialState: {
    referrals: null,
    referral: null,
    loading: false,
    error: null,
    message: '',
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
    updateReferralStatus(state, action) {
      const { id, status } = action.payload;
      const index = state.referrals.findIndex((ref) => ref.id === id);
      if (index !== -1) {
        state.referrals[index].status = status;
      }
    },
    deleteReferral(state, action) {
      state.referrals = state.referrals.filter(
        (ref) => ref.id !== action.payload.id
      );
    },
    attributeReferralRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = '';
    },
    attributeReferralSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    attributeReferralFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const referralReducer = referralSlice.reducer;
const referralActions = referralSlice.actions;
export { referralActions, referralReducer };
