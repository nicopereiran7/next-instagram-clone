import { UserIcon, ReceiptRefundIcon, CogIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { logOut } from "../../store/slices/userSlice";
import { setFeed } from "../../store/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DropdownProfileNavOptions() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cerrarSesion = () => {
    dispatch(logOut());
    dispatch(setFeed([]));
    window.location.href = "/";
  };

  return (
    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 right-[0px] transition">
      <DropdownItem name="Perfil" link={`/${user?.username}`}>
        <UserIcon className="w-4 h-4" />
      </DropdownItem>
      <DropdownItem name="Guardado" link="#">
        <ReceiptRefundIcon className="w-4 h-4" />
      </DropdownItem>
      <DropdownItem name="Configuracion" link="/account/edit">
        <CogIcon className="w-4 h-4" />
      </DropdownItem>
      <li onClick={cerrarSesion}>
        <p className="rounded-b bg-white hover:bg-[#F8F8F8] py-2 px-4 whitespace-no-wrap text-sm flex gap-1 items-center">
          Salir
        </p>
      </li>
    </ul>
  );
}

function DropdownItem({ name, children, link }) {
  const router = useRouter();
  return (
    <li onClick={() => router.push(link)}>
      <p className="rounded-b bg-white hover:bg-[#F8F8F8] py-2 px-4 whitespace-no-wrap text-sm flex gap-1 items-center">
        {children}
        {name}
      </p>
    </li>
  );
}
