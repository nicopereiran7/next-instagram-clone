import LayoutBasic from "../layouts/LayoutBasic";
import HeadComponent from "../components/HeadComponent";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import VideoThumbnail from "react-thumbnail-player";

export default function Explore() {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/post/all`);
      const result = await res.json();
      setPosts(result);
    }catch(e) {
      console.log(e.response);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [posts])

  const addClass = (index) => {
    const newIndex = index + 1;
    if(newIndex === 2 || newIndex === 7) {
      return true;
    }
    return false
  }

  return (
    <LayoutBasic>
      <HeadComponent title="Explora en Instagram"/>
      
      {/* POSTS */}
      {!posts ? (
        <div className="flex h-full justify-center items-center">
          <CircularProgress size={14} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 py-5">
          {posts.map((post, index) => {
            let add = addClass(index);

            return (
              <div key={index} className={`w-full h-full aspect-1 ${add && "col-span-2 row-span-2"}`}>
                {post.type === "image" ? (
                  <img 
                    src={post.url}
                    alt=""
                    className="w-full aspect-1 object-cover"
                  />
                ) : (
                  <VideoThumbnail 
                    preview={post.url}
                    badgeBg="transparent"
                    muted={false}
                    width={"100%"}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </LayoutBasic>
  )
}