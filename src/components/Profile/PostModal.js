import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, ChevronRightIcon, BookOpenIcon } from "@heroicons/react/outline";
import CommentForm from "../Post/CommentForm";
import moment from "moment";

export default function PostModal() {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(
        `http://localhost:3000/api/post/${router.query.id}`
      );
      const data = await res.json();
      setPost(data);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    async function fetchCommentsPost() {
      try {
        const res = await fetch(`http://localhost:3000/api/post/comments/${router.query.id}`);
        if(res.status === 200) {
          const data = await res.json();
          setComments(data);
        }
      }catch (e) {
        console.log(e)
      }
    }
    fetchCommentsPost();
  }, [])

  const timeAgo = (date) => moment(date).fromNow();

  return (
    <div className="flex">
      {!post ? (
        <LinearProgress />
      ) : (
        <>
          {/* image */}
          <div className="flex-[0.6_1_0%] max-h-[80vh]">
            <div className="flex justify-center w-full h-full">
              <img
                src={post?.url}
                alt={post?.idUser.name}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* details */}
          <div className="flex-[0.4_1_0%] bg-white flex flex-col justify-between">
            {/* top */}
            <div>
              {/* header */}
              <div className="flex items-center justify-between px-4 py-4 gap-4  border-solid border-b-[1px] border-neutral-300">
                <div className="w-[40px]">
                  <img
                    src={post?.idUser.avatar || "/assets/avatar.png"}
                    alt={post?.idUser.name}
                    className="w-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full flex justify-start">
                  <Link href={`/${post?.idUser.username}`}>
                    <a className="font-semibold">{post?.idUser.username}</a>
                  </Link>
                </div>
                <div>
                  <DotsHorizontalIcon className="w-5 h-5" />
                </div>
              </div>
              {/* post description */}
              <div className="flex gap-4 px-4 py-5">
                <div className="w-[28px]">
                  <img
                    src={post?.idUser.avatar || "/assets/avatar.png"}
                    alt={post?.idUser.name}
                    className="w-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{`${post?.idUser.username} `}</span>
                    {post?.description}
                  </p>
                  <p className="text-[12px] py-4 text-[#B1B1B1]">{timeAgo(post?.createdAt)}</p>
                </div>
                
              </div>
              {/* comentarios */}
              {comments.length > 0 && (
                  <div className="px-4 h-[274px] overflow-y-auto">
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
                          <p className="text-sm" onClick={() => router.push(`/${item?.idUser.username}`)}>
                            <span className="font-semibold hover:cursor-pointer">{`${item?.idUser.username} `}</span>
                            {item.comment}
                          </p>
                          <p className="text-[12px] py-4 text-[#B1B1B1]">{timeAgo(item.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
            {/* botton */}
            <div>
              {/* iconos */}
              <div className="p-4 flex items-center justify-between border-solid border-b-[1px] border-t-[1px] border-neutral-300">
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-7 w-7"/>
                  <ChatIcon className="h-7 w-7" />
                  <ChevronRightIcon className="h-7 w-7"/>
                </div>
                <div>
                  <BookOpenIcon className="h-7 w-7"/>
                </div>
              </div>
              {/* comentario bar */}
              <CommentForm idPost={router.query.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
