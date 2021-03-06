import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useUserAuth from "../hooks/useUserAuth";
import useAllUserAuth from "../hooks/useAllUserAuth";
import useFeed from "../hooks/useFeed";
import useStories from "../hooks/useStories";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { getToken } from "../utils/localStorage";
import { useRouter } from "next/router";

export default function LayoutBasic({ children }) {
  const router = useRouter();
  const { user, isLoading } = useUserAuth();
  const { userAuth, userAuthIsLoading } = useAllUserAuth();
  const { feedIsLoading } = useFeed();
  const { isLoadingStories } = useStories();

  // ir al inicio en cada pagina que este el LayoutBasic, si no hay usuario auth
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, []);

  if (userAuthIsLoading && feedIsLoading && isLoadingStories)
    return <Loading />;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <div>
        {/* navbar */}
        <NavBar userAuth={userAuth} userAuthIsLoading={userAuthIsLoading} />
        {/* main-content */}
        <div className="flex justify-center">
          <div className="max-w-[975px] w-full px-4 lg:px-0 mb-4">
            {children}
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
