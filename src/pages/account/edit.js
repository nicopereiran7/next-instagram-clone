import HeadComponent from "../../components/HeadComponent";
import LayoutConfigProfile from "../../layouts/LayoutConfigProfile";
import EditUserForm from "../../components/Profile/EditUserForm";
import EditAvatarProfile from "../../components/Profile/EditAvatarProfile";
import useAllUserAuth from "../../hooks/useAllUserAuth";

export default function Edit() {
  const { userAuth } = useAllUserAuth();

  return (
    <LayoutConfigProfile>
      <HeadComponent title="Editar perfil - Instagram" />
      {/* EDITAR PERFIL */}
      <div className="py-8 flex flex-col max-w-lg w-full">
        {/* header */}
        <EditAvatarProfile userAuth={userAuth}/>
        {/* form editar usuario */}
        <EditUserForm />
      </div>
    </LayoutConfigProfile>
  );
}
