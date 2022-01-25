import HeadComponent from "../components/HeadComponent";
import Login from "../components/Login";
import LayoutBasic from "../layouts/LayoutBasic";;
import AvatarProfile from "../components/AvatarProfile";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import useUserAuth from "../hooks/useUserAuth";
import useAllUserAuth from "../hooks/useAllUserAuth";
import Loading from "../components/Loading";
import { LinearProgress } from "@mui/material";
import Feed from "../components/Feed";
import useFeed from "../hooks/useFeed";
import useStories from "../hooks/useStories";
import Stories from "../components/Home/Stories";
import Suggestions from "../components/Home/Suggestions";

function Home() {
  const { user } = useUserAuth();
  const { userAuth, userAuthIsLoading } = useAllUserAuth();
  const { feedList, feedIsLoading } = useFeed();
  const { stories, isLoadingStories } = useStories();
  const router = useRouter();

  return (
    <div>
      <HeadComponent title="Instagram" />
      {!user ? (
        <Login />
      ) : (
        <LayoutBasic>
          <HeadComponent title="Instagram" />
          <div className="mt-4 flex justify-center md:flex max-w-[975px]">
            {/* left-content */}
            <div className="flex-1 md:flex-[0.65_1_0%] flex flex-col gap-4 mb-4 max-w-[600px]">
              {stories?.length > 0 && <Stories stories={stories}/>}
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
                      onClick={() => router.push(`/${user.username}`)}
                    >
                      {user.username}
                    </h1>
                    <h2 className="font-light">{user.name}</h2>
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
    </div>
  );
}

export default Home;
