import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { referralReducer } from "./slices/referralSlice";
import { profileReducer } from "./slices/profileSlice";
import {referralRequestReducer} from "./slices/requestSlice"
import { referralAttributesReducer } from "./slices/attributes";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    referrals: referralReducer,
    user: userReducer,
    requests : referralRequestReducer,
    attributes : referralAttributesReducer
  },
});

export default store;
