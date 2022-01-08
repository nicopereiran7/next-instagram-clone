import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { UserRemoveIcon } from "@heroicons/react/outline";

export default function Follow({ username }) {
  const { user: userAuth } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchFollowUser() {
      const res = await fetch(
        `http://localhost:3000/api/follow/${userAuth?.id}/isfollow/${username}`
      );
      const data = await res.json();
      setIsFollow(data.isFollow);
    }
    fetchFollowUser();
    setReload(false);
  }, [username, reload]);

  const unFollowUser = async () => {
    try {
      const userData = {
        userAuthId: userAuth.id,
        followed: username,
      };
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/follow/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setIsLoading(false);
      setReload(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const followUser = async () => {
    try {
      const userData = {
        userAuthId: userAuth.id,
        userToFollow: username,
      };
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/user/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setIsLoading(false);
      setReload(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isFollow ? (
        <button
          onClick={unFollowUser}
          className="py-1 px-2 bg-red-500 text-white text-sm flex items-center gap-2"
        >
          {!isLoading ? (
            <UserRemoveIcon className="w-5 h-5" />
          ) : (
            <CircularProgress size={14} className="mt-2" />
          )}
        </button>
      ) : (
        <button
          onClick={followUser}
          className="py-1 px-4 bg-[#3799F7] text-white text-sm rounded-sm"
        >
          {!isLoading ? (
            "Seguir"
          ) : (
            <CircularProgress size={14} className="mt-2" />
          )}
        </button>
      )}
    </>
  );
}
