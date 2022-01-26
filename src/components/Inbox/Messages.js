import { hora } from "../../utils/time";
import { useState, useEffect, useRef } from "react";

const Messages = ({ messages, userAuth }) => { 
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  return (
    <div>
      {!messages || messages.length === 0 ? (
        <p>No hay mensajes</p>
      ) : messages?.map((item, index) => (
        <MessageItem key={index} item={item} userAuth={userAuth} />
      ))}
      <div ref={scrollRef}/>
    </div>
  )
}

export default Messages;

const MessageItem = ({ item, userAuth }) => {
  const [isMyMessage, setIsMyMessage] = useState(false);
  const myMessage = () => userAuth.username === item.idUser.username ? true : false;

  useEffect(() => {
    setIsMyMessage(myMessage());
  }, [item]); 
  

  return (
    <div className="relative">
      <span className="text-xs text-gray-700 flex justify-center py-3">{hora(item.createdAt)}</span>
      <div className={`flex items-center gap-2 w-fit ${isMyMessage && "ml-auto"}`}>
        {!isMyMessage && 
          <div className="w-6">
            <img src={item.idUser?.avatar || "/assets/avatar.png"} alt="" className="w-full aspect-1 rounded-full"/>
          </div>
        }
        <p className="p-3 text-sm w-fit rounded-2xl bg-white border border-solid border-[#dbdbdb]">{item.message}</p>
      </div>
    </div>
  )
}