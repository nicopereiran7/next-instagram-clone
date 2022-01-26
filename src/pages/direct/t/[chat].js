import LayoutInbox from "../../../layouts/LayoutInbox";
import { HeartIcon, PhotographIcon, MoonIcon, InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Messages from "../../../components/Inbox/Messages";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SocketIOClient from "socket.io-client";

export default function Chat() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const { userAuth } = useSelector(state => state.userAuth);
  const [connected, setConnected] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/chat/${router.query?.chat}/messages`);
      const result = await res.json();
      setMessages(result);
    }catch(e) {
      console.log(e);
    }
  };

  const fetchChatInfo = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/chat/${router.query?.chat}/info`);
      const result = await res.json();
      
      const member = result?.members.find(member => member.username !== userAuth?.username);
      setChatInfo(member);
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let mounted = true;
    fetchMessages();
    return () => mounted = false;
  }, [router.query]);

  useEffect(() => {
    fetchChatInfo();
  }, [router.query])

  useEffect(() => {
    const socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_SERVER_URI, {
      path: "/api/socketio",
    });
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", () => {
      fetchMessages();
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = { idUser: userAuth._id, idChat: router.query.chat, message: inputMessage };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/message/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(res.status === 200) {
        setInputMessage("");
      }
    }catch(e) {
      console.log(e);
    }
  }

  return (
    <LayoutInbox>
      <div className="h-full flex flex-col">
        {/* header chat */}
        <div className="px-6 py-4 flex items-center gap-3 border-b border-solid border-b-[#dbdbdb]">
          <div className="w-7">
            <img src={chatInfo?.avatar || "/assets/avatar.png"} alt="" className="w-full aspect-1 rounded-full" />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium">{chatInfo?.username || ""}</h3>
            <p className="text-xs text-gray-500">{"Activo(a) hace 1h"}</p>
          </div>
          <div>
            <InformationCircleIcon className="w-7 h-7" />
          </div>
        </div>

        {/* chat content */}
        <div className="p-6 flex-1 overflow-y-auto" >
          {/* messages */}
          <Messages messages={messages} userAuth={userAuth} />
        </div>

        {/* input message */}
        <div className="px-6 py-4">
          <form className="flex items-center gap-2 border border-solid border-gray-300 rounded-2xl px-2 py-1" onSubmit={sendMessage}>
            <MoonIcon className="h-7 w-7" />
            <input type="text" onChange={(e) => setInputMessage(e.target.value)} value={inputMessage} placeholder="Enviar mensaje.." className="flex-grow focus:outline-none px-2"/>
            {!inputMessage ? (
              <>
                <HeartIcon className="h-7 w-7" />
                <PhotographIcon className="h-7 w-7" />
              </>
            ) : (
              <button type="submit" className="text-sky-500 font-medium text-sm">Enviar</button>
            )}
          </form>
        </div>
      </div>
    </LayoutInbox>
  ) 
}

// export async function getServerSideProps({ query: { chat } }) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URI}/api/chat/${chat}/messages`
//   );

//   if (res.status === 200) {
//     const messages = await res.json();

//     return {
//       props: {
//         messages
//       },
//     };
//   }
//   return {
//     props: {
//       error: {
//         statusCode: res.status,
//         statusText: "Invalid chat id",
//       },
//     },
//   };
// }


