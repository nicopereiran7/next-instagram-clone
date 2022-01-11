import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localStorage";
import { decodeToken } from "../../utils/token";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    userAuth: null,
    userAuthIsLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.userAuth = action.payload;
      state.userAuthIsLoading = false;
    },
    setIsLoading: (state, action) => {
      state.userAuthIsLoading = action.payload;
    }
  },
});

export const { setUser, setIsLoading } = userAuthSlice.actions;

export default userAuthSlice.reducer;

export const setUserAuth = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const token = await getToken();

  if (token) {
    try {
      const user = decodeToken(token);
      const res = await fetch(`http://localhost:3000/api/user/${user?.username}`);
      const data = await res.json();
  
      dispatch(setUser(data || null));
    }catch (err) {
      dispatch(setUser(null));
    }
  }
};