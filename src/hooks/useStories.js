import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../store/slices/storiesSlice";

export default function useFeed() {
  const dispatch = useDispatch();
  const { stories, isLoadingStories } = useSelector((store) => store.stories);

  useEffect(() => {
    let mounted = true;
    if(mounted && !stories) {
      dispatch(fetchStories());
    }

    return () => mounted = false;
  }, []);

  return {
    stories,
    isLoadingStories,
  };
}