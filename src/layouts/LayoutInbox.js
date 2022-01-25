import { useState } from "react";
import LayoutBasic from "./LayoutBasic";
import HeadComponent from "../components/HeadComponent";
import { ReplyIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import ChatsBar from "../components/Inbox/ChatsBar";
import Link from "next/link";
import ModalBasic from "../components/Modal/ModalBasic";
import UsersToSendMessage from "../components/Inbox/UsersToSendMessage";

export default function LayoutInbox({ children }) {
  const { userAuth } = useSelector(state => state.userAuth);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  return (
    <LayoutBasic>
      <HeadComponent title="Bandeja de entrada - Chats" />

      <div className="flex bg-white shadow-2xl border border-solid border-slate-300 my-4 divide-x min-h-[80vh] max-h-[80vh]">

        {/* Left side - CHATS */}
        <div className="flex-[0.3_1_0%] flex flex-col">
          <div className="grid grid-cols-3 p-6 border-b border-solid border-b-[#dbdbdb]">
            <div />
            <div className="flex justify-center">
              <p className="text-lg font-semibold">{userAuth?.username}</p>
            </div>
            <div className="flex items-center justify-end">
              <ReplyIcon className="h-5 w-5 hover:cursor-pointer" onClick={() => setOpenModal(true)}/>
              <ModalBasic openModal={openModal} closeModal={closeModal} haveTitle={true} title="Nuevo Mensaje">
                <UsersToSendMessage />
              </ModalBasic>
            </div>
          </div>

          <div className="py-2 px-4 border-b border-solid border-b-[#dbdbdb]">
            <Link href="/direct/inbox">
              <a className="font-medium">Principal</a>
            </Link>
          </div>

          {/* Chats */}
          <ChatsBar userAuth={userAuth} />
        </div>

        {/* Right side - CHAT CONTENT */}
        <div className="l-border flex-[0.7_1_0%]">
          {children}
        </div>
      </div>
    </LayoutBasic>
  )
}