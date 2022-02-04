import HeadComponent from "../components/HeadComponent";
import Login from "../components/Login";
import LayoutBasic from "../layouts/LayoutBasic";;
import AvatarProfile from "../components/AvatarProfile";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { LinearProgress } from "@mui/material";
import Feed from "../components/Feed";
import Stories from "../components/Home/Stories";
import Suggestions from "../components/Home/Suggestions";
import { useEffect, useState } from "react";
import { getToken } from "../utils/localStorage";
import { useSelector } from "react-redux";

function Home() {
  const [auth, setAuth] = useState({ token: null, isLoadingToken: true });
  const { user } = useSelector(state => state.user);
  const { userAuth, userAuthIsLoading } = useSelector(state => state.userAuth);
  const { feedList, feedIsLoading } = useSelector(state => state.feed);
  const { stories, isLoadingStories } = useSelector(state => state.stories);
  const router = useRouter();

  useEffect(() => {
    setAuth({ token: getToken(), isLoadingToken: false });
  }, []);

  return (
    <>
      <HeadComponent title="Instagram" />
      {!auth.token && !auth.isLoadingToken ? (
        <Login />
      ) : (
        <LayoutBasic>
          <div className="mt-4 flex justify-center md:flex max-w-[975px] min-h-[90vh]">
            {/* left-content */}
            <div className="flex-1 md:flex-[0.65_1_0%] flex flex-col gap-4 mb-4 max-w-[600px]">
              {stories?.length > 0 && <Stories stories={stories} isLoadingStories={isLoadingStories} />}
              <Feed userAuth={userAuth} data={feedList} feedIsLoading={feedIsLoading}/>
            </div>

            {/* right-content  */}
            <div className="hidden md:flex-[0.35_1_0%] md:block pl-7">
              <div className="sticky top-20">
                {/* profile */}
                <div className="flex items-center justify-between py-4">
                  <div className="w-16 h-[51px]">
                    {userAuthIsLoading ? (
                      <LinearProgress />
                    ) : (
                      <AvatarProfile userAuth={userAuth} />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center w-full ml-4">
                    <h1
                      className="font-medium box-border hover:cursor-pointer"
                      onClick={() => router.push(`/${user?.username}`)}
                    >
                      {user?.username}
                    </h1>
                    <h2 className="font-light">{user?.name}</h2>
                  </div>
                </div>
                {/* sugerencias */}
                {!userAuthIsLoading && <Suggestions userAuth={userAuth} />}
                {/* footer-nav */}
                <Footer />
              </div>
            </div>
          </div>
        </LayoutBasic>
      )}
    </>
  );
}

export default Home;
