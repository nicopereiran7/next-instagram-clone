import {
  HomeIcon,
  ChatIcon,
  HeartIcon,
  PlusCircleIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownProfileNavOptions from "./Profile/DropdownProfileNavOptions";
import SearchBar from "./Search/SearchBar";
import useAllUserAuth from "../hooks/useAllUserAuth";
import { useState } from "react";
import UploadPost from "./Profile/UploadPost";

export default function NavBar() {
  const router = useRouter();
  const { userAuth } = useAllUserAuth();
  const [openPostModal, setOpenPostModal] = useState(false);

  const closePostModal = () => setOpenPostModal(false);

  return (
    <nav className="flex justify-center bg-white sticky top-0 z-10">
      <div className="w-[975px]">
        <div className="flex items-center justify-between py-3 w-full">
          {/*LEFT */}
          <div className="w-[118px]">
            <Link href="/">
              <a>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                  alt="Instagram Clone Nicolas Pereira"
                  className="w-full object-cover"
                />
              </a>
            </Link>
          </div>
          {/*CENTER */}
          <div className="hidden ml-4 sm:w-[298px] sm:ml-10 md:block">
            <SearchBar />
          </div>
          {/*RIGHT */}
          <div className="flex justify-end items-center">
            {/* icons */}
            <div className="flex items-center justify-end w-full">
              <HomeIcon
                className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer"
                onClick={() => router.push("/")}
              />
              <ChatIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              {/* nueva publicacion icon */}
              <PlusCircleIcon
                className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer"
                onClick={() => setOpenPostModal(true)}
              />
              <UploadPost
                openModal={openPostModal}
                closeModal={closePostModal}
              />
              <SunIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              <HeartIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              <div className="w-6 h-6 mx-2 hover:cursor-pointer dropdown inline-block relative">
                <img
                  src={userAuth?.avatar || "/assets/avatar.png"}
                  alt=""
                  className="w-full h-full relative top-[1px] object-cover rounded-full transition ease-in-out duration-300 transform hover:scale-110"
                  loading="lazy"
                />
                <DropdownProfileNavOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
