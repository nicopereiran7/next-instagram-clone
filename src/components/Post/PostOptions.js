import { useRouter } from "next/router";
import ModalBasic from "../Modal/ModalBasic";

export default function PostOptions({ openOptionsPostModal, closeModalOptions, idPost }) {
  const router = useRouter();

  const goPost = () => {
    router.push(`/p/${idPost}`);
    closeModalOptions();
  }

  return (
    <ModalBasic 
      openModal={openOptionsPostModal}
      closeModal={closeModalOptions}
    >
      <div className="flex flex-col divide-y">
        <p className="py-3 text-center hover:cursor-pointer text-red-500 font-medium text-sm">Reportar</p>
        <p className="py-3 text-center hover:cursor-pointer font-light text-sm" onClick={goPost}>Ir a la publicacion</p>
        <p className="py-3 text-center hover:cursor-pointer font-light text-sm">Compartir en..</p>
        <p className="py-3 text-center hover:cursor-pointer font-light text-sm">Copiar enlace</p>
        <p className="py-3 text-center hover:cursor-pointer font-light text-sm">Insertar</p>
        <p className="py-3 text-center hover:cursor-pointer font-light text-sm" onClick={closeModalOptions}>Cancelar</p>
      </div>
    </ModalBasic>
  )
}