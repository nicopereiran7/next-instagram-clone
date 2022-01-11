import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

export default function PostModal() {
  const router = useRouter();
  const [post, setPost] = useState(null);

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

  return (
    <div className="flex my-4 border-solid border-[1px] border-neutral-300">
      {!post ? (
        <LinearProgress />
      ) : (
        <>
          {/* image */}
          <div className="flex-[0.7_1_0%] max-h-[80vh]">
            <div className="flex justify-center w-full h-full">
              <img
                src={post?.url}
                alt={post?.idUser.name}
                className="aspect-1 object-cover"
              />
            </div>
          </div>

          {/* details */}
          <div className="flex-[0.3_1_0%] bg-white flex flex-col justify-between">
            {/* top */}
            <div>
              {/* header */}
              <div className="flex items-center justify-between px-3 py-4 gap-4  border-solid border-b-[1px] border-neutral-300">
                <div className="w-[40px]">
                  <img
                    src={post?.idUser.avatar || "/assets/avatar.png"}
                    alt={post?.idUser.name}
                    className="w-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full flex justify-start">
                  <Link href={`/${post?.idUser.username}`}>
                    <a>{post?.idUser.username}</a>
                  </Link>
                </div>
                <div>
                  <DotsHorizontalIcon className="w-5 h-5" />
                </div>
              </div>
              {/* post description */}
              <div className="flex gap-4 px-3 py-5">
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
                </div>
              </div>
            </div>
            {/* botton */}
            <div>
              {/* iconos */}
              <div className="p-3">icons</div>
              {/* comentario bar */}
              <div className="flex items-center p-3">
                <input
                  type="text"
                  placeholder="Agregar un comentario"
                  className="focus:outline-none flex flex-grow"
                />
                <button className="text-sky-500">Publicar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
