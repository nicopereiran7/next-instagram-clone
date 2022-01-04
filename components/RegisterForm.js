import Link from "next/link";
import ButtonForm from "./Form/ButtonForm";
import InputForm from "./Form/InputForm";
import Separator from "./Form/Separator";

export default function RegisterForm() {
  return (
    <div className="max-w-[360px]">
      {/* Formulario */}
      <div className="bg-white border-solid border-[1px] border-neutral-300 py-8 px-10 mb-2">
        <div className="flex flex-col items-center justify-center mb-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" className="w-9/12 object-cover"/>
          <h1 className="text-center">Regístrate para ver fotos y videos de tus amigos.</h1>
        </div>
        <Separator />
        <form className="flex flex-col">
          <InputForm type="text" placeholder="Correo Electronico"/>
          <InputForm type="text" placeholder="Nombre Completo" />
          <InputForm type="text" placeholder="Nombre de usuario" />
          <InputForm type="password" placeholder="Contraseña"/>
          <ButtonForm name="Registrarse"/>
        </form>
        <p className="text-center text-[12px] text-[#8e8e8e]">Al registrarte, aceptas nuestras Condiciones, la Política de datos y la Política de cookies.</p>
      </div>

      {/* Iniciar Sesion */}
      <div className="bg-white border-solid border-[1px] border-neutral-300">
        <p className="p-6 text-[12px] text-center">¿Tienes una cuenta?
          <Link href="/">
            <a className="text-[#3799F7] font-medium"> Inicia sesión</a>
          </Link>
        </p>
      </div>

      {/* Descargar Instagram */}
      <div className="flex items-center justify-center my-4">
        <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_spanish_latinamerica_mexico.png/e2247c4f90de.png" alt="" className="w-32"/>
        <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_spanish_latinamerica_mexico-es_LA.png/3cd8a27083c0.png" alt="" className="w-32"/>
      </div>
    </div>
  )
}