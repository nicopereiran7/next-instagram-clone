import LayoutBasic from "./LayoutBasic";
import HeadComponent from "../components/HeadComponent";

export default function LayoutInbox() {
  return (
    <LayoutBasic>
      <HeadComponent title="Bandeja de entrada - Chats" />
      <div className="flex">
        <div className="flex-[0.3_1_0%]">sidebar</div>
        <div className="flex-[0.7_1_0%]">mensajes</div>
      </div>
    </LayoutBasic>
  )
}