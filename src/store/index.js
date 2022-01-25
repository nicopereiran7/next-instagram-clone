import { configureStore } from "@reduxjs/toolkit";
//reducers
import userSlice from "./slices/userSlice";
import userAuthSlice from "./slices/userAuthSlice";
import postsSlice from "./slices/postsSlice";
import storiesSlice from "./slices/storiesSlice";
import chatsSlice from "./slices/chatsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    userAuth: userAuthSlice,
    feed: postsSlice,
    stories: storiesSlice,
    chats: chatsSlice,
  },
});
