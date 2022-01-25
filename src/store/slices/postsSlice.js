import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localStorage";
import { decodeToken } from "../../utils/token";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    feedList: null,
    feedIsLoading: true
  },
  reducers: {
    setFeed: (state, action) => {
      state.feedList = action.payload;
    },
    setIsLoading: (state, action) => {
      state.feedIsLoading = action.payload;
    }
  }
})

export const { setFeed, setIsLoading } = postsSlice.actions;

export default postsSlice.reducer;

export const setFeedList = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const token = getToken();

  if(token) {
    try {
      const user = await decodeToken(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/follow/${user.id}/feed`);
      const data = await res.json();

      dispatch(setFeed(data || null));
      dispatch(setIsLoading(false));
    }catch(e) {
      dispatch(setIsLoading(false));
    }
  }
}