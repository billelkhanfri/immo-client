import { createSlice } from "@reduxjs/toolkit";

const referralRequestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: null, // Initialisation avec un tableau vide
    request: null
  },
  reducers: {
    createReferralRequest(state, action) {
      state.requests.push(action.payload); // Ajout de la nouvelle demande au tableau des requests
    },
    getAllRequests(state, action) {
      state.requests = action.payload;
    },
    getReferral(state, action) {
      state.request = action.payload;
    },
  },
});

const referralRequestReducer = referralRequestSlice.reducer;
const referralRequestActions = referralRequestSlice.actions;

export { referralRequestReducer, referralRequestActions };
