import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '../../utils/localStorage';
import { decodeToken } from "../../utils/token";


const ChatSlice = createSlice({
  name: 'chatsSlice',
  initialState: {
    chats: null,
    chatIsLoading: false,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setChatIsLoading: (state, action) => {
      state.chatIsLoading = action.payload;
    }
  }
});

export const { setChats, setChatIsLoading } = ChatSlice.actions;

export default ChatSlice.reducer;

export const fetchChats = () => async (dispatch) => {
  dispatch(setChatIsLoading(true));
  const token = getToken();

  if(token) {
    try {
      const user = await decodeToken(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/chats/${user.id}`);
      const data = await res.json();

      dispatch(setChats(data || null));
      dispatch(setChatIsLoading(false));
    }catch(e) {
      dispatch(setChatIsLoading(false));
    }
  }
}