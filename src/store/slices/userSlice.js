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
      state.isLoading = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const setUserAuth = () => async (dispatch) => {
  const token = await getToken();

  if (token) {
    const user = decodeToken(token);
    dispatch(setUser(user));
  }
};

export const logOut = () => async (dispatch) => {
  removeToken();
  dispatch(setUser(null));
};
