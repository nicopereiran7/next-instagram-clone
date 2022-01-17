import Link from "next/link";
import { useRouter } from "next/router";
import ModalBasic from "../Modal/ModalBasic";
import { useContextualRouting } from "next-use-contextual-routing";
import PostModal from "./PostModal";
import useAllUserAuth from "../../hooks/useAllUserAuth";
import useScreenSize from "../../hooks/useScreenSize";
import VideoThumbnail from "react-thumbnail-player";

export default function GridPost({ data }) {
  const router = useRouter();
  const { makeContextualHref, returnHref } = useContextualRouting();
  const { userAuth } = useAllUserAuth();
  const width = useScreenSize();

  const closeModal = () => {
    router.push(returnHref);
  };

  return (
    <>
      <div className="grid gap-1 grid-cols-2 px-1 sm:gap-1 sm:grid-cols-3 sm:px-2 md:gap-4 md:px-0">
        {data?.map((item, index) => (
          <div key={index} className="w-full h-full aspect-1">
            <Link
              href={makeContextualHref({ id: item._id })}
              as={`/p/${item._id}`}
              shallow
            >
              <a className="">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full object-cover aspect-1 hover:cursor-pointer"
                  />
                ) : (
                  <VideoThumbnail 
                    preview={item.url}
                    width="100%"
                    badgeBg="transparent"
                    muted={false}
                  />
                )}
                
              </a>
            </Link>
          </div>
        ))}
      </div>

      <ModalBasic
        openModal={!!router.query.id}
        closeModal={closeModal}
        border={false}
        width={width >= 1024 ? 1000 : width >= 768 ? 740 : 400 }
      >
        <PostModal userAuth={userAuth}/>
      </ModalBasic>
    </>
  );
}
