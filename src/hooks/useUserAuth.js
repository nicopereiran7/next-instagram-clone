import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../store/slices/userSlice";
import { useRouter } from "next/router";

export default function useUserAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(setUserAuth());
  }, [router]);

  return {
    user,
    isLoading,
  };
}
