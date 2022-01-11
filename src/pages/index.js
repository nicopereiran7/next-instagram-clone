import HeadComponent from "../components/HeadComponent";
import Login from "../components/Login";
import LayoutBasic from "../layouts/LayoutBasic";
import FeedPost from "../components/Home/FeedPost";
import AvatarProfile from "../components/AvatarProfile";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import useUserAuth from "../hooks/useUserAuth";
import useAllUserAuth from "../hooks/useAllUserAuth";
import Loading from "../components/Loading";
import { LinearProgress } from "@mui/material";

const FEED = [
  { id: 1, username: "Nicolas" },
  { id: 2, username: "Nicolas" },
  { id: 2, username: "Nicolas" },
  { id: 4, username: "Nicolas" },
];

function Home() {
  const { user, isLoading } = useUserAuth();
  const { userAuth, userAuthIsLoading } = useAllUserAuth();
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <div>
      <HeadComponent title="Instagram" />
      {!user ? (
        <Login />
      ) : (
        <LayoutBasic>
          <>
            <HeadComponent title="Instagram" />
          </>
          <div className="mt-4 block sm:flex max-w-[975px]">
            {/* left-content */}
            <div className="flex-1 sm:flex-[0.65_1_0%] flex flex-col gap-4 mb-4">
              {FEED.map((post, index) => (
                <FeedPost key={index} post={post} />
              ))}
            </div>

            {/* right-content  */}
            <div className="hidden sm:flex-[0.35_1_0%] sm:block pl-6">
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
              <div>sugerencias</div>
              {/* footer-nav */}
              <Footer />
            </div>
          </div>
        </LayoutBasic>
      )}
    </div>
  );
}

export default Home;
