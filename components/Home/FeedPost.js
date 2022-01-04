import {
  HeartIcon,
  ChatAltIcon,
  BookOpenIcon,
  ArrowCircleRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

export default function FeedPost({ post }) {
  return (
    <div className="w-full bg-white border-solid border-[1px] border-neutral-300">
      {/* header post */}
      <div className="p-4 flex items-center justify-between">
        <div className="w-10">
          <img
            src="https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg"
            alt={post.username}
            className="w-full object-cover rounded-full"
          />
        </div>
        <div className="flex items-start w-full pl-4">
          <h1 className="font-medium text-sm">{post.username}</h1>
        </div>
        <div>
          <DotsHorizontalIcon className="w-5 h-5 hover:cursor-pointer" />
        </div>
      </div>
      {/* imagen post */}
      <div>
        <img
          src="https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg"
          alt=""
          className="w-full object-cover"
        />
      </div>
      {/* info post */}
      <div className="px-4 pt-4">
        {/* icons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <HeartIcon className="h-7 w-7 hover:cursor-pointer" />
            <ChatAltIcon className="h-7 w-7 hover:cursor-pointer" />
            <ArrowCircleRightIcon className="h-8 w-7 hover:cursor-pointer" />
          </div>
          <div>
            <BookOpenIcon className="h-7 w-7 hover:cursor-pointer" />
          </div>
        </div>
        <div>comentarios</div>
        <div className="hidden sm:flex py-4 sm:justify-between">
          <input
            type="text"
            placeholder="Agregar un comentario"
            className="focus:outline-none flex-grow"
          />
          <button className="bg-transparent text-[#3799F7]">Publicar</button>
        </div>
      </div>
    </div>
  );
}
