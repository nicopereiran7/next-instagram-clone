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
  const { user: userAuth, isLoading } = useUserAuth();
  const { userFound, followers, followed, posts } = data;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [titleModal, setTitleModal] = useState("");

  if (!userAuth && isLoading) return <Loading />;

  if (error) {
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
        <div className="min-h-[80vh]">
          {/* PROFILE INFO */}
          <div className="w-full inline-block md:flex p-4 sm:p-8 mb-4">
            {/* -- avatar image --*/}
            <div className="flex-[0.3_1_0%] px-0 sm:px-10 ">
              <div className="w-[100px] sm:w-[170px]">
                <img
                  src={userFound?.avatar || "/assets/avatar.png"}
                  alt={userFound?.username}
                  className="w-full aspect-1 rounded-full object-cover"
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
                {userFound?.description && <p>{userFound?.description}</p>}
                {userFound?.siteWeb && <a href={userFound?.siteWeb} className="text-sm font-semibold text-[#00376b]" target="_blank" rel="noreferrer">{userFound?.siteWeb?.replace(/^https?:\/\//, '')}</a>}
              </div>
            </div>
          </div>

          {/* PUBLICACIONES */}
          {!posts ? <LinearProgress /> : <Posts user={userFound} posts={posts} />}
        </div>
      )}
    </LayoutBasic>
  );
}

export async function getServerSideProps({ query: { username } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/alldata/${username}`
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
      data: {
        userFound: null, 
        followers: null,
        followed: null, 
        posts: null
      },
      error: {
        statusCode: response.status,
        statusText: "Invalid Username",
      },
    },
  };
}

export default Username;
