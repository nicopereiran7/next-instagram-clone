import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UsersToSendMessage() {
  const { userAuth } = useSelector(state => state.userAuth);
  const [users, setUsers] = useState(null);

  const fetchFollowUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/followed/${userAuth.username}`);
      const result = await res.json();
      setUsers(result);
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let mounted = true;

    fetchFollowUsers();

    return () => mounted = false;
  }, [])

  const send = (id) => {
    console.log(id);
  }

  return (
    <div className="py-2 px-4 max-h-xs">
      <div className="h-full overflow-y-auto flex justify-center flex-1 flex-col gap-2">
        {users ? users.map((user, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="w-10">
              <img src={user.followed.avatar || "/assets/avatar.png"} alt="" className="w-full aspect-1 object-cover rounded-full" />
            </div>
            <div className="flex flex-col flex-grow justify-start">
              <p className="font-medium">{user.followed.username}</p>
              <span className="text-sm font-medium text-gray-500">{user.followed.name}</span>
            </div>
            <div>
              <button className="text-sm font-medium text-sky-500" onClick={() => send(user.followed._id)}>Enviar</button>
            </div>
          </div>
        )) : (
          <div className="p-4">
            <CircularProgress size={14} className="mt-2"/>
          </div>
        )}
      </div>
    </div>
  )
}