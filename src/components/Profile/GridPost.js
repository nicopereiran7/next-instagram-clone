import Link from "next/link";
import { useRouter } from "next/router";
import ModalBasic from "../Modal/ModalBasic";
import { useContextualRouting } from "next-use-contextual-routing";
import PostModal from "./PostModal";

export default function GridPost({ data }) {
  const router = useRouter();
  const { makeContextualHref, returnHref } = useContextualRouting();

  const closeModal = () => {
    router.push(returnHref);
  };

  return (
    <>
      <div className="grid gap-1 sm:gap-[20px] grid-cols-2 sm:grid-cols-3 px-1 sm:px-0">
        {data?.map((item, index) => (
          <div key={index} className="w-full">
            <Link
              href={makeContextualHref({ id: item._id })}
              as={`/p/${item._id}`}
              shallow
            >
              <a>
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full object-cover aspect-1 hover:cursor-pointer"
                />
              </a>
            </Link>
          </div>
        ))}
      </div>

      <ModalBasic
        openModal={!!router.query.id}
        closeModal={closeModal}
        width={1000}
        border={false}
      >
        <PostModal />
      </ModalBasic>
    </>
  );
}
