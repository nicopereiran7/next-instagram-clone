import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localStorage";
import { decodeToken } from "../../utils/token";

export const storieSlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    isLoadingStories: true,
  },
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setIsLoadingStories: (state, action) => {
      state.isLoadingStories = action.payload;
    }
  },
});

export const { setStories, setIsLoadingStories } = storieSlice.actions;

export default storieSlice.reducer;

export const fetchStories = () => async (dispatch) => {
  dispatch(setIsLoadingStories(true));
  const token = getToken();

  if(token) {
    try {
      const user = await decodeToken(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/followed/${user.username}`);
      const result = await res.json();

      dispatch(setStories(result));
      dispatch(setIsLoadingStories(false));
    }catch (err) {
      console.log(err);
      dispatch(setIsLoadingStories(false));
    }
  }
} 