import { useState } from "react";
import {
  SearchIcon,
  XIcon,
  HomeIcon,
  ChatIcon,
  HeartIcon,
  PlusCircleIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import AvatarProfile from "./AvatarProfile";

export default function NavBar() {
  const [inputSearch, setInputSearch] = useState("");
  const router = useRouter();

  const resetSearch = () => {
    setInputSearch("");
  };

  return (
    <nav className="flex justify-center bg-white sticky top-0">
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
          <div className="hidden ml-4 sm:w-[298px] sm:ml-10 sm:block">
            <div className="w-full bg-[#efefef] flex items-center p-2 rounded-lg">
              <SearchIcon className="h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar"
                onChange={(e) => setInputSearch(e.target.value)}
                value={inputSearch}
                className="w-full focus:outline-none bg-[#efefef] px-2"
              />
              {inputSearch !== "" && (
                <XIcon
                  className="h-5 w-5 hover:cursor-pointer"
                  onClick={resetSearch}
                />
              )}
            </div>
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
              <PlusCircleIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              <SunIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              <HeartIcon className="h-7 w-7 mx-2 translate-y-0 hover:translate-y-1 transition-transform hover:cursor-pointer" />
              <div className="w-6 mx-2 hover:cursor-pointer">
                <AvatarProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
