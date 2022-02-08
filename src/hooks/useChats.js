import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../store/slices/chatsSlice";

export default function useChats() {
  const dispatch = useDispatch();
  const { chats, chatIsLoading } = useSelector((store) => store.chats);

  useEffect(() => {
    let mounted = true;
    if (mounted && chats === null) {
      dispatch(fetchChats());
    }

    return () => (mounted = false);
  }, []);

  return {
    chats,
    chatIsLoading,
  };
}
