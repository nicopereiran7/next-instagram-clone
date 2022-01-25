import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useUserAuth from "../hooks/useUserAuth";
import useAllUserAuth from "../hooks/useAllUserAuth";
import useFeed from "../hooks/useFeed";
import useStories from "../hooks/useStories";
import useChats from "../hooks/useChats";
import Loading from "../components/Loading";

export default function LayoutBasic({ children }) {
  const { user } = useUserAuth();
  const { userAuth, userAuthIsLoading } = useAllUserAuth();
  const { feedList, feedIsLoading } = useFeed();
  const { stories, isLoadingStories } = useStories();
  const { chats, chatsIsLoading } = useChats();
  
  if (userAuthIsLoading && feedIsLoading && isLoadingStories) return <Loading />;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <div>
        {/* navbar */}
        <NavBar userAuth={userAuth} userAuthIsLoading={userAuthIsLoading}/>
        {/* main-content */}
        <div className="flex justify-center">
          <div className="max-w-[975px] w-full min-h-screen px-4 lg:px-0 mb-4">{children}</div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
