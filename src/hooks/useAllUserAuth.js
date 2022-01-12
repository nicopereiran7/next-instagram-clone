import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../store/slices/userAuthSlice";
import { useRouter } from "next/router";

export default function useUserAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userAuth, userAuthIsLoading } = useSelector((store) => store.userAuth);

  useEffect(() => {
    dispatch(setUserAuth());
  }, [router.route]);

  return {
    userAuth,
    userAuthIsLoading
  };
}