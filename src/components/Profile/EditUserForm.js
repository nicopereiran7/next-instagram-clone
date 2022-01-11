import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";
import useAllUserAuth from "../../hooks/useAllUserAuth";
import { getToken } from "../../utils/localStorage";
import { CircularProgress } from "@mui/material";

export default function EditUserForm() {
  const { userAuth } = useAllUserAuth();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setReload(false);
  }, [reload]);

  const formik = useFormik({
    initialValues: {
      name: userAuth?.name,
      username: userAuth?.username,
      email: userAuth?.email,
      description: userAuth?.description || "",
      site: userAuth?.siteWeb || "",
    },
    validationSchema: null,
    onSubmit: async (formData) => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/user/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Autorization": `${getToken()}`,
          },
          body: JSON.stringify(formData),
        });

        if(res.status === 200) {
          toast.success("Usuario Actualizado Correctamente");
          setIsLoading(false);
          setReload(true);
        }else {
          toast.warning("Error al guardar cambios");
          setIsLoading(false);
        }

      } catch (err) {
        console.log(err);
        toast.error("Error al guardar cambios");
        setIsLoading(false);
      }
    },
  });

  if (!userAuth) return <Loading />;

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div className="flex gap-6">
        <label className="flex-[0.4_1_0%] flex justify-end">Nombre</label>
        <input
          className="flex-[0.6_1_0%] focus:outline-none border-solid border-[1px] border-neutral-300 py-1 px-3 text-base"
          name="name"
          onChange={formik.handleChange}
          defaultValue={formik.values.name}
        />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex-[0.4_1_0%] flex justify-end">
          Nombre de usuario
        </label>
        <input
          className="flex-[0.6_1_0%] focus:outline-none border-solid border-[1px] border-neutral-300 py-1 px-3 text-base"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex-[0.4_1_0%] flex justify-end">Sitio Web</label>
        <input
          className="flex-[0.6_1_0%] focus:outline-none border-solid border-[1px] border-neutral-300 py-1 px-3 text-base"
          placeholder="http://google.com"
          name="site"
          onChange={formik.handleChange}
          value={formik.values.site}
        />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex-[0.4_1_0%] flex justify-end">Descripcion</label>
        <textarea
          className="flex-[0.6_1_0%] focus:outline-none border-solid border-[1px] border-neutral-300 py-1 px-3 text-base"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        ></textarea>
      </div>
      <div className="flex items-center gap-6">
        <label className="flex-[0.4_1_0%] flex justify-end">
          Correo Electronico
        </label>
        <input
          className="flex-[0.6_1_0%] focus:outline-none border-solid border-[1px] border-neutral-300 py-1 px-3 text-base"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      {/* botones */}
      <div className="flex justify-center">
        {isLoading ? (
          <button className="py-1 px-4 bg-sky-500 text-white">
            <CircularProgress size={14} className="mt-2" />
          </button>
        ) : (
          <button className="py-1 px-4 bg-sky-500 text-white" type="submit">
          Guardar
        </button>
        )}
      </div>
      <ToastContainer />
    </form>
  );
}
