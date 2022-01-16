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

const FEED = [
  { 
    _id: 1, 
    idUser: {
      username: "Nicolas",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 2, 
    idUser: {
      username: "Sebastian",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 3, 
    idUser: {
      username: "Cristobal",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 4, 
    idUser: {
      username: "David",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
];

function Home() {
  const { user, isLoading } = useUserAuth();
  const { userAuth, userAuthIsLoading } = useAllUserAuth();
  const { feedList, feedIsLoading } = useFeed();
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <div>
      <HeadComponent title="Instagram" />
      {!user ? (
        <Login />
      ) : (
        <LayoutBasic>
          <HeadComponent title="Instagram" />
          <div className="mt-4 block sm:flex max-w-[975px]">
            {/* left-content */}
            <div className="flex-1 sm:flex-[0.65_1_0%] flex flex-col gap-4 mb-4">
              <Feed userAuth={userAuth} data={feedList.length === 0 ? FEED : feedList} feedIsLoading={feedIsLoading}/>
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
