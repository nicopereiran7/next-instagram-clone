import { useRouter } from "next/router";
import { ViewGridIcon } from "@heroicons/react/outline";
import GridPost from "./GridPost";

const DATA = [
  {
    id: 1,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 2,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 3,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 4,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 5,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 6,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 7,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 8,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
  {
    id: 9,
    title: "hola",
    url: "https://www.ilustrado.cl/wp-content/uploads/2020/12/Dubai.jpg",
  },
];

export default function Posts({ user, posts }) {
  const router = useRouter();

  return (
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
      {/* user posts */}
      <div className="min-h-[40vh]">
        {posts.length === 0 ? <h1>No hay Posts</h1> : <GridPost data={posts} />}
      </div>
    </div>
  );
}
