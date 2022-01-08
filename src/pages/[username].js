import LayoutBasic from "../layouts/LayoutBasic";
import useUserAuth from "../hooks/useUserAuth";
import HeadComponent from "../components/HeadComponent";
import PageNotFound from "../components/PageNotFound";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import {
  CogIcon,
  ViewGridIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import GridPost from "../components/Profile/GridPost";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getToken } from "../utils/localStorage";
import Follow from "../components/Profile/Follow";
import ModalBasic from "../components/Modal/ModalBasic";
import Followers from "../components/Profile/Followers";

const DATA = [
  {
    id: 1,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 2,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 3,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 4,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 5,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 6,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 7,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 8,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 9,
    title: "hola",
    link: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
];

function Username({ user, followers, followed, error }) {
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
            : `${user?.name} (${user?.username}) - Fotos y video en Instagram`
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
              <div className="w-[100px] sm:w-[170px]">
                <img
                  src={user?.avatar ? user.avatar : "/assets/avatar.png"}
                  alt={user?.username}
                  className="rounded-full"
                />
              </div>
            </div>
            {/*-- profile info --*/}
            <div className="flex-[0.7_1_0%] flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-light">{user?.username}</h1>
                {userAuth?.username === user?.username ? (
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
                    <Follow username={user?.username} />
                    <div>
                      <DotsHorizontalIcon className="w-5 h-5" />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full flex gap-6 my-4">
                <p>publicaciones</p>
                <p
                  onClick={allFollowers}
                  className="hover:cursor-pointer"
                >{`${followers.length} Seguidores`}</p>
                <p>{`${followed.length} Seguidos`}</p>
              </div>
              <ModalBasic
                openModal={openModal}
                closeModal={closeModal}
                title={titleModal}
              >
                {modalContent}
              </ModalBasic>

              <div className="max-w-[500px]">
                <h2 className="font-medium">{user?.name}</h2>
                <p>
                  lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit
                  amet, consectetur lorem ipsum dolor sit amet, consectetur
                  lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit
                  amet, consectetur
                </p>
                {user?.description && <p>{user?.description}</p>}
              </div>
            </div>
          </div>

          {/* PUBLICACIONES */}
          <div className="mb-4">
            {/* navegacion publicaciones - videos */}
            <div className="border-solid border-t-[1px] border-neutral-300 flex justify-center px-4 py-3">
              <div
                className={`flex items-center justify-center gap-1 hover:cursor-pointer ${
                  router.asPath.replace("/", "") === user?.username &&
                  "text-[#3799F7]"
                }`}
              >
                <ViewGridIcon className="w-4 h-4" />
                <p className="uppercase">Publicaciones</p>
              </div>
              {/* <div>videos</div>
              <div>guardado</div>
              <div>etiquetas</div> */}
            </div>
            {/* data */}
            <div>
              <GridPost data={DATA} />
            </div>
          </div>
        </>
      )}
    </LayoutBasic>
  );
}

export async function getServerSideProps({ query: { username } }) {
  const response = await fetch(
    `${process.env.SERVER_URI}/api/user/${username}`
  );
  const getFollowers = await fetch(
    `${process.env.SERVER_URI}/api/user/followers/${username}`
  );
  const getFollowed = await fetch(
    `${process.env.SERVER_URI}/api/user/followed/${username}`
  );

  if (
    response.status === 200 &&
    getFollowers.status === 200 &&
    getFollowed.status === 200
  ) {
    const user = await response.json();
    const followers = await getFollowers.json();
    const followed = await getFollowed.json();

    return {
      props: {
        user,
        followers,
        followed,
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
