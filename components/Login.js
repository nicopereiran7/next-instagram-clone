import Footer from "./Footer";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className=" grid gap-5 md:grid-cols-2 grid-cols-1">
        <div className="md:block hidden">
          <img src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png" alt="" className="w-10/12 object-cover"/>
        </div>
        
        <div className="max-w-sm">
          <LoginForm />
          <div className="flex items-center justify-center my-3">
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_spanish_latinamerica_mexico.png/e2247c4f90de.png" alt="" className="w-32"/>
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_spanish_latinamerica_mexico-es_LA.png/3cd8a27083c0.png" alt="" className="w-32"/>
          </div>
        </div>

        
      </div>

      <Footer />
    </div>
  )
}