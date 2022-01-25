import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Suggestions({ userAuth }) {
  const [suggestions, setSuggestions] = useState(null);
  const router = useRouter();

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/follow/${userAuth._id}/notfollow`);
      const result = await res.json();
      setSuggestions(result);
    }catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(userAuth) {
      fetchSuggestions();
    }
  }, [])
  
  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <p className="text-sm">Sugerencias para ti</p>
        <p className="text-sm hover:cursor-pointer">Ver todo</p>
      </div>
      {/* user suggestions */}
      <div className="my-2 w-full">
        {!suggestions ? (
          <>
            <div className="animate-pulse flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full aspect-1"></div>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-gray-200 h-4 rounded col-span-2">
                </div>
                <div className="bg-gray-200 h-4 rounded col-span-1">
                </div>
              </div>
            </div>
            <div className="animate-pulse flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full aspect-1"></div>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-gray-200 h-4 rounded col-span-2">
                </div>
                <div className="bg-gray-200 h-4 rounded col-span-1">
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {suggestions?.slice(0, 5)?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="w-10">
                  <img src={item.avatar || "/assets/avatar.png"} alt=""  className="w-full aspect-1 object-cover rounded-full"/>
                </div>
                <div className="w-full flex flex-col justify-start ml-3">
                  <p className="font-medium hover:cursor-pointer hover:underline" onClick={() => router.push(`/${item.username}`)}>{item.username}</p>
                  <p className="text-gray-500 text-[12px]">Nuevo en instagram</p>
                </div>
                <div>
                  <button className="text-[12px] text-blue-400 font-medium">Seguir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )  
}