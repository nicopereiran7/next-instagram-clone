import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthAllData } from "../store/slices/userAuthSlice";

export default function useUserAuth() {
  const dispatch = useDispatch();
  const { userAuth, userAuthIsLoading } = useSelector((store) => store.userAuth);

  useEffect(() => {
    let mounted = true;
    if (mounted && !userAuth) {
      dispatch(setUserAuthAllData());
    }
    return () => mounted = false;
  }, []);

  return {
    userAuth,
    userAuthIsLoading
  };
}