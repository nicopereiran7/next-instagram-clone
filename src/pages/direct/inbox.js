import LayoutInbox from "../../layouts/LayoutInbox";

export default function Inbox(props) {
  console.log(props);
  return (
    <LayoutInbox>
      <div className="h-full flex flex-col justify-center item-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-center text-3xl font-light">Tus mensajes</h2>
          <p className="text-center text-sm">Envía fotos y mensajes privados a un amigo o un grupo.</p>

          <div className="flex justify-center">
            <button className="bg-sky-500 text-white px-3 py-1 font-medium rounded-lg">Enviar Mensaje</button>
          </div>
        </div>
      </div>
    </LayoutInbox>
  )
}