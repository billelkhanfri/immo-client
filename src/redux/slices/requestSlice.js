import { createSlice } from "@reduxjs/toolkit";

const referralRequestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [], // Initialized as an empty array
    request: null,
  },

  reducers: {
    createReferralRequest(state, action) {
      state.requests.push(action.payload); // Ajout de la nouvelle demande au tableau des requests
    },
    getAllRequests(state, action) {
      state.requests = action.payload;
    },
    getRequest(state, action) {
      state.request = action.payload;
    },
    updateRequestStatus(state, action) {
      const { id, status } = action.payload;
      const index = state.requests.findIndex((ref) => ref.id === id);
      if (index !== -1) {
        state.requests[index] = { ...state.requests[index], status };
      }
    },
  },
});

const referralRequestReducer = referralRequestSlice.reducer;
const referralRequestActions = referralRequestSlice.actions;

export { referralRequestReducer, referralRequestActions };
