import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  ChevronRightIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import CommentForm from "../Post/CommentForm";
import moment from "moment";
import { getToken } from "../../utils/localStorage";
import PostOptions from "../Post/PostOptions";
import ReactPlayer from "react-player";

export default function PostModal({ userAuth }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const postId = router.query.id;
  const [openOptionsPostModal, setOpenOptionsPostModal] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/post/${postId}`
        );
        if (res.status === 200) {
          const result = await res.json();
          setPost(result);
        }
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchPost();
  }, []);

  useEffect(() => {
    async function fetchLike() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/${userAuth?._id}/islike/${postId}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setIsLike(data.isLike);
        }
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchLike();
    setReload(false);
  }, [reload]);

  useEffect(() => {
    async function fetchCommentsPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/post/comments/${postId}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setComments(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchCommentsPost();
    setReload(false);
  }, [reload]);

  const closeModalOptions = () => setOpenOptionsPostModal(false);

  const timeAgo = (date) => moment(date).fromNow();

  const addLike = async (idPost) => {
    if (!idPost) return null;

    try {
      const data = { idPost };
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (res.status === 200 || result.like) {
        setReload(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteLike = async (idPost) => {
    if (!idPost) return null;

    try {
      const data = { idPost };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        setReload(true);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div className="w-full flex max-h-[660px] min-h-[660px]">
      {!post ? (
        <LinearProgress />
      ) : (
        <>
          {/* image - video */}
          <div className="flex-1 md:flex-[0.6_1_0%]">
            <div className="overflow-hidden flex justify-center items-center w-full h-full bg-black">
              {post.type === "image" ? (
                <img
                  src={post?.url}
                  alt={post?.idUser.name}
                  className="h-full"
                />
              ) : (
                <ReactPlayer
                  url={post.url}
                  controls={true}
                  playsinline={true}
                  loop={true}
                  width="100%"
                  height="100%"
                />
              )}
            </div>
          </div>

          {/* details */}
          <div className="hidden md:flex-[0.4_1_0%] bg-white md:flex flex-col justify-between">
            <div className="h-full flex flex-col">
              {/* header */}
              <div className="flex items-center justify-between px-4 py-4 gap-4  border-solid border-b-[1px] border-neutral-300">
                <div className="w-[40px]">
                  <img
                    src={post?.idUser.avatar || "/assets/avatar.png"}
                    alt={post?.idUser.name}
                    className="w-full aspect-1 h-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full flex justify-start">
                  <Link href={`/${post?.idUser.username}`}>
                    <a className="font-semibold">{post?.idUser.username}</a>
                  </Link>
                </div>
                {/* opciones del post */}
                <div>
                  <DotsHorizontalIcon
                    className="w-5 h-5 hover:cursor-pointer"
                    onClick={() => setOpenOptionsPostModal(true)}
                  />
                  <PostOptions
                    openOptionsPostModal={openOptionsPostModal}
                    closeModalOptions={closeModalOptions}
                    idPost={post._id}
                  />
                </div>
              </div>

              {/* post description */}
              <div className="flex gap-4 px-4 py-5">
                <div className="w-[28px]">
                  <img
                    src={post?.idUser.avatar || "/assets/avatar.png"}
                    alt={post?.idUser.name}
                    className="w-full aspect-1 object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{`${post?.idUser.username} `}</span>
                    {post?.description}
                  </p>
                  <p className="text-[12px] py-4 text-[#B1B1B1]">
                    {timeAgo(post?.createdAt)}
                  </p>
                </div>
              </div>

              {/* comentarios */}
              {comments.length > 0 && (
                <div className="px-4 flex-1 overflow-y-auto">
                  {comments.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-[28px] max-h-[28px]">
                        <img
                          src={item?.idUser.avatar || "/assets/avatar.png"}
                          alt={item?.idUser.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm"
                          onClick={() =>
                            router.push(`/${item?.idUser.username}`)
                          }
                        >
                          <span className="font-semibold hover:cursor-pointer">{`${item?.idUser.username} `}</span>
                          {item.comment}
                        </p>
                        <p className="text-[12px] py-4 text-[#B1B1B1]">
                          {timeAgo(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col">
                {/* iconos */}
                <div className="p-4 flex items-center justify-between border-solid border-b-[1px] border-t-[1px] border-neutral-300">
                  <div className="flex items-center gap-2">
                    {!isLike ? (
                      <HeartIcon
                        className="h-7 w-7 hover:cursor-pointer"
                        onClick={() => addLike(router.query.id)}
                      />
                    ) : (
                      <HeartIconSolid
                        className="h-7 w-7 hover:cursor-pointer text-red-500"
                        onClick={() => deleteLike(router.query.id)}
                      />
                    )}
                    <ChatIcon className="h-7 w-7" />
                    <ChevronRightIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <BookOpenIcon className="h-7 w-7" />
                  </div>
                </div>
                {/* comentario bar */}
                <CommentForm idPost={router.query.id} setReload={setReload} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
