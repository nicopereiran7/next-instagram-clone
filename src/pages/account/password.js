import HeadComponent from "../../components/HeadComponent";
import LayoutConfigProfile from "../../layouts/LayoutConfigProfile";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function Password() {
  const { userAuth, userAuthIsLoading } = useSelector(state => state.userAuth);
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: null,
    onSubmit: async (formData) => {
      console.log(formData);
    },
  });

  return (
    <LayoutConfigProfile>
      <HeadComponent title="Cambiar Contraseña - Instagram"/>
      
      <div className="flex justify-center w-full">
        {!userAuthIsLoading ? (
          <form className="w-full flex flex-col max-w-xl gap-4 mt-8" onSubmit={formik.handleSubmit}>
          <div className="flex items-center gap-2">
            <div className="flex-[0.4_1_0%]">
              <img src={userAuth?.avatar || "/assets/avatar.png"} alt={userAuth?.username} className="w-12 aspect-1 rounded-full object-cover"/>
            </div>
            <div className="flex-[0.6_1_0%] flex-grow">
              <h1 className="font-medium text-2xl">{userAuth?.username}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-[0.4_1_0%] font-medium">Contraseña anterior</label>
            <input type="text" className="flex-[0.6_1_0%] flex-grow focus:outline-none py-1 px-4 text-lg border border-solid border-gray-300 rounded-lg"/>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-[0.4_1_0%] font-medium">Contraseña nueva</label>
            <input type="text" className="flex-[0.6_1_0%] flex-grow focus:outline-none py-1 px-4 text-lg border border-solid border-gray-300 rounded-lg"/>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-[0.4_1_0%] font-medium">Confirmar contraseña nueva</label>
            <input type="text" className="flex-[0.6_1_0%] flex-grow focus:outline-none py-1 px-4 text-lg border border-solid border-gray-300 rounded-lg"/>
          </div>

          <div>
            <button type="submit" className="bg-sky-500 text-white text-sm font-medium px-3 py-1 rounded-md">Cambiar contraseña</button>
          </div>
        </form>
        ) : (
          <CircularProgress size={14} />
        )}
      </div>
    </LayoutConfigProfile>
  )
}