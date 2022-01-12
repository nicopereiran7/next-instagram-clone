import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { setToken } from "../utils/localStorage";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../store/slices/userSlice";

export default function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: null,
    onSubmit: async (formData) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          const result = await response.json();
          setToken(result.token);
          dispatch(setUserAuth());
          setLoginError(null);
          setIsLoading(false);
          window.location.href = "/";
        }
      } catch (e) {
        const { error } = e.response.data;
        setLoginError(error);
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="bg-white mb-4 py-5 px-10 border-solid border-[1px] border-neutral-300">
        <div className="p-[20px] flex items-center justify-center mb-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            alt="Instagram-clone Nicolas Pereira"
            className="w-1/2 object-cover"
          />
        </div>
        <div>
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              className="py-[4px] px-2 bg-gray-100 focus:outline-none mb-3 w-full border-solid border-[1px] border-neutral-300"
              placeholder="Correo Electronico"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              type="password"
              className="py-[4px] px-2 bg-gray-100 focus:outline-none mb-3 w-full border-solid border-[1px] border-neutral-300"
              placeholder="Contraseña"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <button
              className="bg-[#3799F7] text-white border-none py-[4px] w-full rounded-sm"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={14} className="mt-2" />
              ) : (
                "Iniciar Sesion"
              )}
            </button>
            {loginError && (
              <p className="text-center text-red-600 text-sm pt-4">
                {loginError}
              </p>
            )}
          </form>
        </div>

        {/* SEPARADOR */}
        <div className="flex items-center mt-4">
          <div className="h-px bg-neutral-300 flex-grow mr-2"></div>
          <div>O</div>
          <div className="h-px bg-neutral-300 flex-grow ml-2"></div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <Link href="#">
            <a className="text-sm">Olvidaste tu contraseña</a>
          </Link>
        </div>
      </div>

      <div className="bg-white p-5 border-solid border-[1px] border-neutral-300">
        <p className="text-center">
          ¿No tienes cuenta?
          <Link href="/register">
            <a className="text-[#3799F7] font-medium"> Registrate</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
