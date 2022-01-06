import { configureStore } from "@reduxjs/toolkit";
//reducers
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
