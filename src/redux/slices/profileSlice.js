import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
  name: "profile",
  initialState: {
    profileUser: null,
  },
  reducers: {
    updateProfile(state, action) {
      state.profileUser = action.payload;
    },
    postProfilePicture(state, action) {
      state.profileUser = action.payload;
    },
    deleteProfilePicture(state, action) {
      state.profileUser = action.payload; 
    },
  },
});

const profileReducer = profilesSlice.reducer;
const profileActions = profilesSlice.actions;
export { profileActions, profileReducer };
