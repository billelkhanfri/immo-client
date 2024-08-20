import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { referralReducer } from "./slices/referralSlice";
import { profileReducer } from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    referrals: referralReducer,
    user: userReducer,
  },
});

export default store;
