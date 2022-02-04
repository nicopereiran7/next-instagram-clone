import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router"
import { useSelector } from "react-redux";

export default function ChatsBar({ userAuth }) {
  const router = useRouter();
  const { chats, chatIsLoading } = useSelector(state => state.chats);

  return (
    <div className="h-full flex flex-col gap-4 px-5 pt-4 flex-1 overflow-y-auto">
      {!chatIsLoading || !chats ? chats.map((chat, index) => (
        <div key={index} className="relative flex flex-col gap-3 hover:cursor-pointer" onClick={() => router.push(`/direct/t/${chat._id}`)}>
          {chat?.members?.map((member, index) => {
            if(member._id !== userAuth._id) {
              return (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-14 h-14 relative block overflow-hidden">
                    <img src={member.avatar || "/assets/avatar.png"} alt="" className="w-full aspect-1 object-cover rounded-full"/>
                    {/* <div className="w-4 h-4 my-1 bg-[#78de45] absolute bottom-0 right-0 rounded-full" /> */}
                  </span>
                  <div>
                    <p className="text-sm">{member.username}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
      )) : (
        <CircularProgress size={14} />
      )}
    </div>
  )
}