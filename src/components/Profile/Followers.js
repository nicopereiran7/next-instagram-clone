import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";

export default function Followers({ followers, setOpenModal }) {
  const userAuth = useUserAuth();
  const router = useRouter();

  const goToUserLink = (link) => {
    setOpenModal(false);
    router.push(link);
  };

  return (
    <div className="py-2 px-4 flex flex-col gap-2">
      {followers.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <div className="w-[34px] h-[24px] flex justify-center">
            <img
              src={
                item.idUser.avatar ? item.idUser.avatar : "./assets/avatar.png"
              }
              alt={item.idUser.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full">
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
      const res = await fetch(
        `http:localhost:3000/api/follow/${userAuth.id}/isFollow/${username}`
      );
      const data = await res.json();
      setIsFollow(data.isFollow);
    }
    fetchIsFollow();
  }, []);

  return (
    <div>
      {isFollow ? (
        <button>Dejar de seguir</button>
      ) : (
        <button className="py-1 px-4 bg-[#3799F7] text-white text-sm rounded-[4px]">
          Seguir
        </button>
      )}
    </div>
  );
};
