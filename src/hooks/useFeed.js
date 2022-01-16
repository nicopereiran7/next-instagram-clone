import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedList } from "../store/slices/postsSlice";

export default function useFeed() {
  const dispatch = useDispatch();
  const { feedList, feedIsLoading } = useSelector((store) => store.feed);

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      dispatch(setFeedList());
    }

    return () => mounted = false;
  }, []);

  return {
    feedList,
    feedIsLoading,
  };
}
