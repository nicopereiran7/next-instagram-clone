import LayoutInbox from "../../layouts/LayoutInbox";

export default function Inbox() {
  return (
    <LayoutInbox>
      <div className="h-full w-full flex flex-col justify-center">
        <h2 className="text-center text-2xl font-light">Tus mensajes</h2>
        <p className="text-center">Envía fotos y mensajes privados a un amigo o un grupo.</p>
      </div>
    </LayoutInbox>
  )
}