import { createSlice } from "@reduxjs/toolkit";
import { getToken, removeToken } from "../../utils/localStorage";
import { decodeToken } from "../../utils/token";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;

export const setUserAuth = () => async (dispatch) => {
  const token = await getToken();
  dispatch(setIsLoading(true));

  if (token) {
    const user = await decodeToken(token);
    dispatch(setUser(user));
  }
  dispatch(setIsLoading(false));
};

export const logOut = () => async (dispatch) => {
  removeToken();
  dispatch(setUser(null));
  dispatch(setIsLoading(false));
};
