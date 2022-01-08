import "../styles/globals.css";
import "../styles/dropdown.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../store/index";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Progress } from "../components";
import { useProgressStore } from "../hooks/useProgressStore";

function MyApp({ Component, pageProps }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };

    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
