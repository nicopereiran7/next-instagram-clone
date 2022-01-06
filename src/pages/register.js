import Footer from "../components/Footer";
import HeadComponent from "../components/HeadComponent";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <>
    <HeadComponent title="Registrarse - Instagram"/>
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <RegisterForm />

      <Footer />
    </div>
    </>
  )
}