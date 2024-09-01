import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { referralReducer } from "./slices/referralSlice";
import { profileReducer } from "./slices/profileSlice";
import {referralRequestReducer} from "./slices/requestSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    referrals: referralReducer,
    user: userReducer,
    requests : referralRequestReducer
  },
});

export default store;
