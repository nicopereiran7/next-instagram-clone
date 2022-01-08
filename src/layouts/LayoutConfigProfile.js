import { useRouter } from "next/router";
import { useEffect } from "react";
import LayoutBasic from "./LayoutBasic";
import Loading from "../components/Loading";
import { getToken } from "../utils/localStorage";
import useUserAuth from "../hooks/useUserAuth";

export default function LayoutConfigProfile({ children }) {
  const router = useRouter();
  const userAuth = useUserAuth();

  useEffect(() => {
    if (!getToken()) {
      router.push("/");
    }
  }, []);

  if (!userAuth) return <Loading />;

  return (
    <LayoutBasic>
      <div className="flex bg-white w-full my-4">
        <div>sidebar</div>
        <div>{children}</div>
      </div>
    </LayoutBasic>
  );
}
