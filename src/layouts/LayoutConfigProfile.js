import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutBasic from "./LayoutBasic";
import { getToken } from "../utils/localStorage";
import Loading from "../components/Loading";
import useAllUserAuth from "../hooks/useAllUserAuth";

export default function LayoutConfigProfile({ children }) {
  const router = useRouter();
  const { userAuth } = useAllUserAuth();
  
  useEffect(() => {
    if (!getToken()) {
      router.push("/");
    }
  }, []);

  if(!userAuth) return <Loading />

  return (
    <LayoutBasic>
      <div className="flex bg-white w-full my-4 border-solid border-[1px] border-neutral-300 divide-x-2">
        <div className="hidden sm:flex flex-[0.3_1_0%] flex-col">
          <LinkItem link="/account/edit" title="Editar Perfil" />
          <LinkItem link="/account/professional_account_settings" title="Cuenta profesional" />
          <LinkItem link="/account/password" title="Cambiar Contraseña" />
          <LinkItem link="#" title="Apps y Sitios Web" />
          <LinkItem link="#" title="Correo Electronico" />
          <LinkItem link="#" title="Notificaciones Push" />
          <LinkItem link="#" title="Administrar Contactos" />
          <LinkItem link="#" title="Correo Electronico" />
          <LinkItem link="#" title="Notificaciones Push" />
          <LinkItem link="#" title="Administrar Contactos" />
          <LinkItem link="#" title="Correo Electronico" />
          <LinkItem link="#" title="Notificaciones Push" />
          <LinkItem link="#" title="Administrar Contactos" />
        </div>
        <div className="w-full flex-1 sm:flex sm:flex-[0.7_1_0%] sm:justify-center l-border">
          {children}
        </div>
      </div>
    </LayoutBasic>
  );
}

const LinkItem = ({ link, title }) => {
  const router = useRouter();
  const [linkActive, setLinkActive] = useState(router.route);

  return (
    <p
      className={`text-medium px-6 py-4 hover:cursor-pointer ${linkActive === link && "font-medium"}`}
      style={{ borderLeft: `${linkActive === link ? "1px solid black" : "none"}` }}
      onClick={() => router.push(link)}
    >
      {title}
    </p>
  );
};
