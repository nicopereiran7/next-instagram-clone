import { useState } from "react";
import Link from "next/link";
import ButtonForm from "./Form/ButtonForm";
import Separator from "./Form/Separator";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterForm() {
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [finalizeRegister, setFinalizeRegister] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      username: Yup.string().matches(/^[a-zA-Z0-9-]*$/),
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (formData, { resetForm }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          setFinalizeRegister(true);
          resetForm();
        }
      } catch (e) {
        const { username, email, error } = e.response.data;
        setUsernameError(username);
        setEmailError(email);
        toast.error(`🦄 ${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="max-w-[360px]">
        {!finalizeRegister ? (
          <>
            {/* Formulario */}
            <div className="bg-white border-solid border-[1px] border-neutral-300 py-8 px-10 mb-2">
              <div className="flex flex-col items-center justify-center mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                  alt=""
                  className="w-9/12 object-cover"
                />
                <h1 className="text-center">
                  Regístrate para ver fotos y videos de tus amigos.
                </h1>
              </div>
              <Separator />
              <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                <input
                  className={`py-[8px] px-2 ${
                    formik.errors.name ? "bg-red-100" : "bg-gray-100"
                  } text-[12px] focus:outline-none mb-2 w-full border-solid border-[1px] ${
                    formik.errors.name ? "border-red-500" : "border-neutral-300"
                  }`}
                  type="text"
                  placeholder="Nombre Completo"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <input
                  className={`py-[8px] px-2 ${
                    formik.errors.username || usernameError
                      ? "bg-red-100"
                      : "bg-gray-100"
                  } text-[12px] focus:outline-none mb-2 w-full border-solid border-[1px] ${
                    formik.errors.username || usernameError
                      ? "border-red-500"
                      : "border-neutral-300"
                  }`}
                  type="text"
                  placeholder="Nombre de usuario"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <input
                  className={`py-[8px] px-2 ${
                    formik.errors.email || emailError
                      ? "bg-red-100"
                      : "bg-gray-100"
                  } text-[12px] focus:outline-none mb-2 w-full border-solid border-[1px] ${
                    formik.errors.email || emailError
                      ? "border-red-500"
                      : "border-neutral-300"
                  }`}
                  type="text"
                  placeholder="Correo Electronico"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <input
                  className={`py-[8px] px-2 ${
                    formik.errors.password ? "bg-red-100" : "bg-gray-100"
                  } text-[12px] focus:outline-none mb-2 w-full border-solid border-[1px] ${
                    formik.errors.password
                      ? "border-red-500"
                      : "border-neutral-300"
                  }`}
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <ButtonForm name="Registrarse" type="submit" />
              </form>
              <p className="text-center text-[12px] text-[#8e8e8e]">
                Al registrarte, aceptas nuestras Condiciones, la Política de
                datos y la Política de cookies.
              </p>
            </div>

            {/* Iniciar Sesion */}
            <div className="bg-white border-solid border-[1px] border-neutral-300">
              <p className="p-6 text-[12px] text-center">
                ¿Tienes una cuenta?
                <Link href="/">
                  <a className="text-[#3799F7] font-medium"> Inicia sesión</a>
                </Link>
              </p>
            </div>

            {/* Descargar Instagram */}
            <div className="flex items-center justify-center my-4">
              <img
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_spanish_latinamerica_mexico.png/e2247c4f90de.png"
                alt=""
                className="w-32"
              />
              <img
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_spanish_latinamerica_mexico-es_LA.png/3cd8a27083c0.png"
                alt=""
                className="w-32"
              />
            </div>
          </>
        ) : (
          <div className="bg-white border-solid border-[1px] border-neutral-300 p-5 mb-5">
            <p className="text-center">
              Para iniciar sesion tienes que activar tu cuenta, haciendo click
              en el enlace que fue enviado a {formik.values.email}
            </p>
            <Link href="/">
              <a className="text-center text-blue-500">Ir a Iniciar Sesion</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
