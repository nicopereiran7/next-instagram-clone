import { useEffect } from "react";
import Footer from "../components/Footer";
import HeadComponent from "../components/HeadComponent";
import RegisterForm from "../components/RegisterForm";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { getToken } from "../utils/localStorage";
import useUserAuth from "../hooks/useUserAuth";

export default function Register() {
  const { user: userAuth } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push("/");
    }
  }, []);

  if (userAuth) return <Loading />;

  return (
    <>
      <HeadComponent title="Registrarse - Instagram" />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <RegisterForm />

        <Footer />
      </div>
    </>
  );
}
