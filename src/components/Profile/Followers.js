import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { UserRemoveIcon } from "@heroicons/react/outline";

export default function Followers({ followers, setOpenModal }) {
  const { user: userAuth, isLoading } = useUserAuth();
  const router = useRouter();

  const goToUserLink = (link) => {
    setOpenModal(false);
    router.push(link);
  };

  return (
    <div className="py-2 px-4 flex flex-col gap-2 max-h-96 overflow-y-auto">
      {isLoading ? (
        <CircularProgress />
      ) : followers.map((item, index) => (
        <div key={index} className="h-full flex items-center justify-between gap-2">
          <div className="w-[66px] h-[30px] flex justify-center">
            <img
              src={
                item.idUser.avatar ? item.idUser.avatar : "./assets/avatar.png"
              }
              alt={item.idUser.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <h3
              className="text-[16px] font-semibold hover:cursor-pointer"
              onClick={() => goToUserLink(item.idUser.username)}
            >
              {item.idUser.username}
            </h3>
            <p className="text-[14px] font-light">{item.idUser.name}</p>
          </div>
          <Seguir userAuth={userAuth} username={item.idUser.username} />
        </div>
      ))}
    </div>
  );
}

const Seguir = ({ userAuth, username }) => {
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    async function fetchIsFollow() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/follow/${userAuth.id}/isfollow/${username}`);
      const result = await res.json();
      setIsFollow(result?.isFollow);
    }
    fetchIsFollow();
  }, []);

  return (
    <div className="flex w-full justify-end">
      {isFollow ? (
        <button className="py-1 px-4 bg-red-500 text-white text-sm rounded-[4px">
          <UserRemoveIcon className="w-4 h-4"/>
        </button>
      ) : userAuth.username !== username && (
        <button className="py-1 px-4 bg-[#3799F7] text-white text-sm rounded-[4px]">
          Seguir
        </button>
      )}
    </div>
  );
};
