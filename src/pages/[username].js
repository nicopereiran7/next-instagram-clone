import LayoutBasic from "../layouts/LayoutBasic";
import useUserAuth from "../hooks/useUserAuth";
import HeadComponent from "../components/HeadComponent";
import PageNotFound from "../components/PageNotFound";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";

function Username({ user, error }) {
  const userAuth = useUserAuth();
  const router = useRouter();

  if (error && error.statusCode) {
    return <PageNotFound details="Usuario No Encontrado" />;
  }

  return (
    <LayoutBasic>
      <HeadComponent
        title={
          !userAuth
            ? "Instagram"
            : `${userAuth?.name} (${userAuth?.username}) - Fotos y video en Instagram`
        }
      />
      {!userAuth ? (
        <LinearProgress />
      ) : (
        <>
          {/* PROFILE INFO */}
          <div className="w-full flex justify-evenly px-8 py-7">
            <div className="w-[170px]">
              <img
                src={user?.avatar ? user.avatar : "/assets/avatar.png"}
                alt={user?.username}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl">{user?.username}</h1>
                {userAuth?.username === user?.username && (
                  <>
                    <button
                      className="bg-white py-1 px-2 text-sm border-solid border-[1px] border-neutral-300 font-medium"
                      onClick={() => router.push("/account/edit")}
                    >
                      Editar Perfil
                    </button>
                    <button>Configuracion</button>
                  </>
                )}
              </div>
              <div className="w-full flex gap-6">
                <p>publicaciones</p>
                <p>seguidores</p>
                <p>seguidos</p>
              </div>
              <div>
                <h2>{user?.name}</h2>
                {user?.description && <p>{user?.description}</p>}
              </div>
            </div>
          </div>

          {/* PUBLICACIONES */}
          <div>publicaciones</div>
        </>
      )}
    </LayoutBasic>
  );
}

export async function getServerSideProps({ query: { username } }) {
  const response = await fetch(
    `${process.env.SERVER_URI}/api/user/${username}`
  );
  if (response.status === 200) {
    const user = await response.json();

    return {
      props: {
        user,
      },
    };
  }
  return {
    props: {
      error: {
        statusCode: response.status,
        statusText: "Invalid Username",
      },
    },
  };
}

export default Username;
