import { useRouter } from "next/router";
import { useEffect } from "react";
import LayoutBasic from "./LayoutBasic";
import Loading from "../components/Loading";
import { getToken } from "../utils/localStorage";
import useUserAuth from "../hooks/useUserAuth";
import useAllUserAuth from "../hooks/useAllUserAuth";

export default function LayoutConfigProfile({ children }) {
  const router = useRouter();
  const { userAuth } = useAllUserAuth();
  
  useEffect(() => {
    if (!getToken()) {
      router.push("/");
    }
    
  }, []);

  if (!userAuth) return <Loading />;

  return (
    <LayoutBasic>
      <div className="flex bg-white w-full my-4 border-solid border-[1px] border-neutral-300">
        <div className="hidden sm:flex flex-[0.3_1_0%] flex-col">
          <LinkItem link="/account/edit" title="Editar Perfil" />
          <LinkItem link="/account/password" title="Cambiar Contraseña" />
          <LinkItem link="#" title="Apps y Sitios Web" />
          <LinkItem link="#" title="Correo Electronico" />
          <LinkItem link="#" title="Notificaciones Push" />
          <LinkItem link="#" title="Administrar Contactos" />
        </div>
        <div className="w-full flex-1 sm:flex sm:flex-[0.7_1_0%] sm:justify-center">
          {children}
        </div>
      </div>
    </LayoutBasic>
  );
}

const LinkItem = ({ link, title }) => {
  const router = useRouter();
  return (
    <p
      className="text-medium px-4 py-3 hover:cursor-pointer hover:bg-red-200"
      onClick={() => router.push(link)}
    >
      {title}
    </p>
  );
};
