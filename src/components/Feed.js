import FeedPost from "./Home/FeedPost";

export default function Feed({ userAuth, data, feedIsLoading }) {
  if(!data && feedIsLoading) return null;

  return (
    <>
      {data?.map((post, index) => (
        <FeedPost key={index} post={post} userAuth={userAuth}/>
      ))}
    </>
  )
}