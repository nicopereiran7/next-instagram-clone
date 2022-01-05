import { useEffect, useState } from "react";
import HeadComponent from "../components/HeadComponent";
import Login from "../components/Login";
import LayoutBasic from "../layouts/LayoutBasic";
import FeedPost from "../components/Home/FeedPost";
import AvatarProfile from "../components/AvatarProfile";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { setUserAuth } from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const FEED = [
  { id: 1, username: "Nicolas" },
  { id: 2, username: "Nicolas" },
  { id: 2, username: "Nicolas" },
  { id: 4, username: "Nicolas" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    dispatch(setUserAuth());
  }, []);

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
                <div className="w-16">
                  <AvatarProfile />
                </div>
                <div className="flex flex-col items-start justify-center w-full ml-4">
                  <h1
                    className="font-medium box-border hover:cursor-pointer"
                    onClick={() => router.push("/username")}
                  >
                    username
                  </h1>
                  <h2 className="font-light">Nombre</h2>
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
