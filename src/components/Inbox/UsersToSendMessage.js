import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchChats } from "../../store/slices/chatsSlice";

export default function UsersToSendMessage({ closeModal }) {
  const { userAuth } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const router = useRouter();

  const fetchFollowUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/followed/${userAuth.username}`
      );
      const result = await res.json();
      setUsers(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;

    fetchFollowUsers();

    return () => (mounted = false);
  }, []);

  const send = async (id) => {
    const data = {
      members: [userAuth._id, id],
      typechat: "direct",
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/chat/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (result.info) {
        router.push(`/direct/t/${id}`);
      } else {
        dispatch(fetchChats());
      }
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-2 px-4 max-h-xs">
      <div className="h-full overflow-y-auto flex justify-center flex-1 flex-col gap-2">
        {users ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3"
            >
              <div className="w-10">
                <img
                  src={user.followed.avatar || "/assets/avatar.png"}
                  alt=""
                  className="w-full aspect-1 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow justify-start">
                <p className="font-medium">{user.followed.username}</p>
                <span className="text-sm font-medium text-gray-500">
                  {user.followed.name}
                </span>
              </div>
              <div>
                <button
                  className="text-sm font-medium text-sky-500"
                  onClick={() => send(user.followed._id)}
                >
                  Enviar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 flex justify-center">
            <CircularProgress size={14} className="mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
