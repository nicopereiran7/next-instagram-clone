import LayoutBasic from "../layouts/LayoutBasic";
import useUserAuth from "../hooks/useUserAuth";
import HeadComponent from "../components/HeadComponent";
import PageNotFound from "../components/PageNotFound";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { CogIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getToken } from "../utils/localStorage";
import Follow from "../components/Profile/Follow";
import ModalBasic from "../components/Modal/ModalBasic";
import Followers from "../components/Profile/Followers";
import Posts from "../components/Profile/Posts";

function Username({ data, error }) {
  const { userFound, followers, followed, posts } = data;

  const { user: userAuth } = useUserAuth();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [titleModal, setTitleModal] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.push("/");
    }
  }, []);

  if (!userAuth) return <Loading />;

  if (error && error.statusCode) {
    return <PageNotFound details="Usuario No Encontrado" />;
  }

  const closeModal = () => {
    setOpenModal(false);
  };

  const allFollowers = () => {
    setOpenModal(true);
    setTitleModal("Seguidores");
    setModalContent(
      <Followers followers={followers} setOpenModal={setOpenModal} />
    );
  };

  return (
    <LayoutBasic>
      <HeadComponent
        title={
          !userAuth
            ? "Instagram"
            : `${userFound?.name} (${userFound?.username}) - Fotos y video en Instagram`
        }
      />
      {!userAuth ? (
        <LinearProgress />
      ) : (
        <>
          {/* PROFILE INFO */}
          <div className="w-full inline-block sm:flex p-4 sm:p-8 mb-4">
            {/* -- avatar image --*/}
            <div className="flex-[0.3_1_0%] px-0 sm:px-10 ">
              <div className="w-[100px] sm:w-[170px] sm:h-[170px]">
                <img
                  src={userFound?.avatar || "/assets/avatar.png"}
                  alt={userFound?.username}
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            {/*-- profile info --*/}
            <div className="flex-[0.7_1_0%] flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-light">{userFound?.username}</h1>
                {userAuth?.username === userFound?.username ? (
                  <>
                    {/* usuario autenticado */}
                    <button
                      className="bg-white py-1 px-2 text-sm border-solid border-[1px] border-neutral-300 font-medium"
                      onClick={() => router.push("/account/edit")}
                    >
                      Editar Perfil
                    </button>
                    <div className="p-1 rounded-full bg-gray-100 hover:cursor-pointer">
                      <CogIcon className="h-8 w-8" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* usuarios normales */}
                    <Follow username={userFound?.username} />
                    <div>
                      <DotsHorizontalIcon className="w-5 h-5" />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full flex gap-6 my-4">
                <p>{`${posts?.length} Publicaciones`}</p>
                <p
                  onClick={allFollowers}
                  className="hover:cursor-pointer"
                >{`${followers.length} Seguidores`}</p>
                <p>{`${followed.length} Seguidos`}</p>
              </div>
              <ModalBasic
                openModal={openModal}
                closeModal={closeModal}
                haveTitle={true}
                title={titleModal}
              >
                {modalContent}
              </ModalBasic>

              <div className="max-w-[500px]">
                <h2 className="font-medium">{userFound?.name}</h2>
                <p>
                  lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit
                  amet, consectetur lorem ipsum dolor sit amet, consectetur
                  lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit
                  amet, consectetur
                </p>
                {userFound?.description && <p>{userFound?.description}</p>}
              </div>
            </div>
          </div>

          {/* PUBLICACIONES */}
          {!posts ? <LinearProgress /> : <Posts user={userFound} posts={posts} />}
        </>
      )}
    </LayoutBasic>
  );
}

export async function getServerSideProps({ query: { username } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/alldata/${username}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (response.status === 200) {
    const data = await response.json();

    return {
      props: {
        data
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
