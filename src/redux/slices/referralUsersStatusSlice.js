import { createSlice } from '@reduxjs/toolkit';

// Définir l'état initial
const initialState = {
  referralUserStatus: null,
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

// Créer le slice
const referralUserStatusSlice = createSlice({
  name: 'referralUserStatus',
  initialState,
  reducers: {
    // Définir les actions
    updateReferralUserStatusStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    updateReferralUserStatusSuccess(state, action) {
      state.status = 'succeeded';
      state.referralUserStatus = action.payload;
    },
    updateReferralUserStatusFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    getReferralUserStatusStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    getReferralUserStatusSuccess(state, action) {
      state.status = 'succeeded';
      state.referralUserStatus = action.payload;
    },
    getReferralUserStatusFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});


const referralUserStatusReducer = referralUserStatusSlice.reducer;
const referralUserStatusActions = referralUserStatusSlice.actions;
export { referralUserStatusReducer, referralUserStatusActions };



