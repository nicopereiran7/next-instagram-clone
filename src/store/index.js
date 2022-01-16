import { configureStore } from "@reduxjs/toolkit";
//reducers
import userSlice from "./slices/userSlice";
import userAuthSlice from "./slices/userAuthSlice";
import postsSlice from "./slices/postsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    userAuth: userAuthSlice,
    feed: postsSlice
  },
});
