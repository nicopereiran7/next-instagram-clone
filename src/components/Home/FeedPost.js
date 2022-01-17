import {
  HeartIcon,
  ChatAltIcon,
  BookOpenIcon,
  ArrowCircleRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import PostOptions from "../Post/PostOptions";
import { useEffect, useState } from "react";
import moment from "moment"
import { useRouter } from "next/router";
import { getToken } from "../../utils/localStorage";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

export default function FeedPost({ post, userAuth }) {
  const [openOptionsPostModal, setOpenOptionsPostModal] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [reloadFeedPost, setReloadFeedPost] = useState(false);
  const router = useRouter();
  const [ref, inView] = useInView({
    threshold: 1
  })

  useEffect(() => {
    async function fetchLikePost() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/${userAuth._id}/islike/${post._id}`);
        if(res.status === 200){
          const data = await res.json();
          setIsLike(data.isLike);
        }
      }catch (e) {
        console.log(e);
      }
    }
    fetchLikePost();
    setReloadFeedPost(false);
  }, [reloadFeedPost])

  const closeModalOptions = () => setOpenOptionsPostModal(false);

  const timeAgo = (date) => moment(date).fromNow();

  const likePost = async (idPost) => {
    try {
      const data = { idPost }
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/add`, {
        method: 'POST',
        headers: {
          "Authorization": `${getToken()}`
        },
        body: JSON.stringify(data),
      });
      if(res.status === 200) {
        const result = await res.json();
        console.log(result);
        setReloadFeedPost(true);
      }
    }catch(e) {
      console.log(e.response);
    }
  }

  const deleteLikePost = async (idPost) => {
    if(!idPost) return null;

    try {
      const data = { idPost }
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/like/delete`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${getToken()}`,
        },
        body: JSON.stringify(data),
      })
      if(res.status === 200) {
        setReloadFeedPost(true);
      }
    }catch(e) {
      console.log(e.response);
    }
  }

  return (
    <div className="w-full bg-white border-solid border-[1px] border-neutral-300">
      {/* header post */}
      <div className="p-4 flex items-center justify-between">
        <div className="w-10 h-9">
          <img
            src={post.idUser.avatar || "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg"}
            alt={post.idUser.username}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex items-start w-full pl-4">
          <h1 className="font-medium text-sm hover:cursor-pointer" onClick={() => router.push(`/${post.idUser.username}`)}>{post.idUser.username}</h1>
        </div>
        <div>
          <DotsHorizontalIcon className="w-5 h-5 hover:cursor-pointer" onClick={() => setOpenOptionsPostModal(true)}/>
        </div>
      </div>
      {/* imagen / viodeo post */}
      <div className="w-full" >
        {post?.type === "image" ? (
          <img
            src={post.url}
            alt={post.idUser.username}
            className="w-full object-cover"
          />
        ) : (
          // <video className="w-full object-cover" ref={ref} controls={true} loop={true} autoPlay={inView}>
          //   <source src={post.url} type="video/mp4" />
          // </video>
          <div className="w-full" ref={ref}> 
            <ReactPlayer 
              url={post.url}
              controls={true}
              playsinline={true}
              playing={inView}
              width="100%"
              height="100%"
            />
          </div>
        )}
        
      </div>
      {/* info post */}
      <div className="px-4 pt-4">
        {/* icons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {isLike ? (
              <HeartIconSolid className="h-7 w-7 hover:cursor-pointer text-red-500" onClick={() => deleteLikePost(post._id)}/>
            ) : (
              <HeartIcon className="h-7 w-7 hover:cursor-pointer" onClick={() => likePost(post._id)}/>
            )}
            
            <ChatAltIcon className="h-7 w-7 hover:cursor-pointer" />
            <ArrowCircleRightIcon className="h-8 w-7 hover:cursor-pointer" />
          </div>
          <div>
            <BookOpenIcon className="h-7 w-7 hover:cursor-pointer" />
          </div>
        </div>
        <div className="py-2 flex flex-col">
          <p className="text-sm">
            <span className="font-semibold hover:underline hover:cursor-pointer" onClick={() => router.push(`/${post.idUser.username}`)}>
              {post.idUser.username}
            </span>
            {` ${post.description}`}
          </p>
          <p>comentarios</p>
          <p className="text-[12px] text-[#B8B8B8]">{timeAgo(post.createdAt)}</p>
        </div>
        <div className="hidden sm:flex py-4 sm:justify-between">
          <input
            type="text"
            placeholder="Agregar un comentario"
            className="focus:outline-none flex-grow"
          />
          <button className="bg-transparent text-[#3799F7]">Publicar</button>
        </div>
      </div>
      <PostOptions openOptionsPostModal={openOptionsPostModal} closeModalOptions={closeModalOptions} idPost={post._id}/>
    </div>
  );
}
