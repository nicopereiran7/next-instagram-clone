import { configureStore } from "@reduxjs/toolkit";
//reducers
import userSlice from "./slices/userSlice";
import userAuthSlice from "./slices/userAuthSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    userAuth: userAuthSlice
  },
});
