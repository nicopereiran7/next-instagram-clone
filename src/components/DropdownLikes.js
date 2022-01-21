import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { timeAgo } from "../utils/time";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

export default function DropdownLikes({ userAuth, userAuthIsLoading }) {
  const [likes, setLikes] = useState(null);
  const router = useRouter();

  const fetchLikes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/posts/${userAuth._id}/likes`);
      const result = await res.json();
      setLikes(result);
    }catch(e) {
      console.log(e.response);
    }
  }

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <ul className="dropdown-menu absolute hidden max-h-[362px] text-gray-700 pt-2 pb-1 px-3 right-[0px] transition bg-white w-[500px] shadow-lg overflow-auto">
      {userAuthIsLoading & !likes ? (
        <CircularProgress size={14}/>
      ) : likes?.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1 hover:cursor-pointer" onClick={() => router.push(`/${item.idPost._id}`)}>
            <div className="w-10">
              <img src={item.idUser.avatar || "/assets/avatar.png"} alt="" className="w-full aspect-1 object-cover rounded-full"/>
            </div>
            <div className="pl-2">
              <p className="text-sm">
                A
                <span className="font-semibold">
                  {` ${item.idUser.username} `}
                  </span>
                {`le gusto tu publicacion `}
                <span className="opacity-50">{timeAgo(item.idPost.createdAt)}</span>
              </p>
            </div>
            <div className="w-10">
              {item.idPost.type === "image" ? (
                <img src={item.idPost.url} alt={item.idUser.username} className="w-full aspect-1 object-cover"/>
              ) : (
                <div className="w-10">
                  <ReactPlayer 
                    url={item.idPost.url}
                    controls={false}
                    playsinline={true}
                    width="100%"
                    height="100%"
                    className="w-full object-cover aspect-1"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      }
    </ul>
  )
}