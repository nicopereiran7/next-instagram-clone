import HeadComponent from "../../components/HeadComponent";
import LayoutBasic from "../../layouts/LayoutBasic";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import Link from "next/link";

function Post({ post }) {
  return (
    <LayoutBasic>
      <HeadComponent title={post ? `${post.idUser.name} en Instagram: ${post.description}` : "Instagram"}/>
      
      {/* POST */}
      <div className="flex my-4 border-solid border-[1px] border-neutral-300">
        {/* image */}
        <div className="flex-[0.7_1_0%] max-h-[80vh]">
          <div className="flex justify-center w-full h-full">
            <img src={post.url} alt={post.idUser.name} className="aspect-1 object-cover"/>
          </div>
        </div>

        {/* details */}
        <div className="flex-[0.3_1_0%] bg-white flex flex-col justify-between">
          {/* top */}
          <div>
            {/* header */}
            <div className="flex items-center justify-between px-3 py-4 gap-4  border-solid border-b-[1px] border-neutral-300">
              <div className="w-[40px] h-[30px]">
                <img src={post.idUser.avatar || "/assets/avatar.png"} alt={post.idUser.name} className="w-full h-full object-cover rounded-full"/>
              </div>
              <div className="w-full flex justify-start">
                <Link href={`/${post.idUser.username}`}>
                  <a>{post.idUser.username}</a>
                </Link>
              </div>
              <div>
                <DotsHorizontalIcon className="w-5 h-5" />
              </div>
            </div>
            {/* post description */}
            <div className="flex gap-4 px-3 py-5">
              <div className="w-[28px] h-[28px]">
                <img src={post.idUser.avatar || "/assets/avatar.png"} alt={post.idUser.name} className="w-full h-full object-cover rounded-full"/>
              </div>
              <div>
                <p className="text-sm"><span className="font-semibold">{`${post.idUser.username} `}</span>{post.description}</p>
              </div>
            </div>
          </div>
          {/* botton */}
          <div>
            {/* iconos */}
            <div className="p-3">icons</div>
            {/* comentario bar */}
            <div className="flex items-center p-3">
              <input type="text" placeholder="Agregar un comentario" className="focus:outline-none flex flex-grow"/>
              <button className="text-sky-500">Publicar</button>
            </div>
          </div> 
        </div>
      </div>

      {/* POST DEL USUARIO */}
    </LayoutBasic>
  )
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/post/${id}`);

  if(res.status === 200) {
    const post = await res.json();

    return {
      props: {
        post
      }
    }
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Post;