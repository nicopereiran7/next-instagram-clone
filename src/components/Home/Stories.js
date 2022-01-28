import { CircularProgress } from "@mui/material";
import Slider from "react-slick";

export default function Stories({ stories: userStories, isLoadingStories }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  return (
    <div className="bg-white border-solid border-[1px] border-neutral-300 p-4">
      {!userStories && !isLoadingStories ? (
        <div className="w-full flex justify-center">
          <CircularProgress size={14} className="mt-2" />
        </div>
      ) : (
        <Slider {...settings}>
          {userStories.map((user, index) => (
            <div key={index} className="hover:cursor-pointer">
              <div className="w-20 px-2">
                <img src={user.followed.avatar || "/assets/avatar.png"} alt="" className="w-full h-full aspect-1 object-cover rounded-full border-2 p-[2px] border-solid border-pink-600" />
              </div>
              <p className="text-[12px] text-center mt-1">{user.followed.username}</p>
            </div>
          ))} 
        </Slider>
      )}
    </div>
  )
}