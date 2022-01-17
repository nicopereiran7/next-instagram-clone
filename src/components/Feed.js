import FeedPost from "./Home/FeedPost";

const FEED = [
  { 
    _id: 1, 
    idUser: {
      username: "Nicolas",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 2, 
    idUser: {
      username: "Sebastian",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 3, 
    idUser: {
      username: "Cristobal",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
  { 
    _id: 4, 
    idUser: {
      username: "David",
      avatar: null
    },
    url: "https://wololosound.com/wp-content/uploads/f2yQlPi4-1-1080x1080.jpeg",
    description: "hola"
  },
];

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