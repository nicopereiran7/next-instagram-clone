import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../store/slices/userSlice";

export default function useUserAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(setUserAuth());
  }, []);

  return user;
}
