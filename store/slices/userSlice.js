import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localStorage";
import { decodeToken } from "../../utils/token";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const setUserAuth = () => async (dispatch) => {
  const token = getToken();

  if (token) {
    const user = decodeToken(token);
    dispatch(setUser(user));
  }
};
