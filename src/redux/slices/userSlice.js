import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userByID: null,
    allUsers : [],
  },
  reducers: {
    getUserByID(state, action) {
      state.userByID = action.payload;
    },
    updateUser(state, action) {
      state.userByID = action.payload;
    },
    deleteUser(state, action) {
      state.userByID = action.payload;
    },
    getAllUser(state, action) {
      state.allUsers = action.payload;

    }
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;
export { userActions, userReducer };
