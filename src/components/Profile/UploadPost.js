import ModalBasic from "../Modal/ModalBasic";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { getToken } from "../../utils/localStorage";
import { CircularProgress } from "@mui/material";

export default function UploadPost({ openModal, closeModal }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userAuth } = useSelector((state) => state.userAuth);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const { type } = file;
    const fileType = type.split("/")[0];

    setFileUpload({
      type: fileType,
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, video/mp4",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: { description: "" },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      try {
        setIsLoading(true);
        const data = new FormData();
        data.append("file", fileUpload.file);
        data.append("data", JSON.stringify(formData));

        const headers = new Headers({
          Authorization: `${getToken()}`,
        });

        const res = await fetch("http://localhost:3000/api/post/new", {
          method: "POST",
          headers,
          body: data,
        });

        //const result = await res.json();

        setIsLoading(false);
        setFileUpload(null);
        resetForm();
        closeModal();
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    },
  });

  const cancelUpload = () => {
    setFileUpload(null);
    closeModal();
  };

  return (
    <ModalBasic
      openModal={openModal}
      closeModal={closeModal}
      haveTitle={true}
      title="Crear una nueva publicacion"
      width={!fileUpload ? 500 : 860}
    >
      <div className="max-h-[64vh] w-full">
        <div className="h-[64vh]">
          {!fileUpload ? (
            <div
              className="h-full flex flex-col justify-center items-center gap-4 hover:cursor-pointer"
              {...getRootProps()}
            >
              <div className="w-20">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833281.png"
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <h2 className="font-light text-2xl">
                Arrastra las fotos y los videos aquí
              </h2>
              <button className="bg-[#3799F7] text-white px-3 py-[4px] rounded-sm font-medium text-sm">
                Selecciona desde la computadora
              </button>
              <input {...getInputProps()} />
            </div>
          ) : (
            <div className="h-full w-full flex">
              {/* source */}
              <div className="min-h-full flex-[0.6_1_0%] w-full flex justify-center items-center">
                {fileUpload.type === "image" ? (
                  <img
                  src={fileUpload.preview}
                  alt=""
                  className="w-full h-full aspect-1 object-cover"
                />
                ):(
                  <video controls={true} className="w-full h-full">
                    <source src={fileUpload.preview} type="video/mp4"/>
                  </video>
                )}
              </div>
              {/* details */}
              <div className="h-full flex-[0.4_1_0%]">
                <form
                  className="h-full w-full flex flex-col justify-between"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="p-4 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8">
                        <img
                          src={userAuth.avatar}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <p className="font-semibold">{userAuth.username}</p>
                    </div>
                    <textarea
                      placeholder="Escribe una descripcion"
                      className="w-full focus:outline-none"
                      rows="6"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    ></textarea>
                  </div>
                  <div className="w-full flex justify-between">
                    {!isLoading ? (
                      <>
                        <button
                          className="w-full py-2 text-red-600"
                          onClick={cancelUpload}
                        >
                          Cancelar
                        </button>
                        <button
                          className="w-full py-2 text-[#3799F7]"
                          type="submit"
                        >
                          Publicar
                        </button>
                      </>
                    ) : (
                      <p className="w-full py-2 text-[#3799F7] flex items-center">
                        <CircularProgress size={14} className="mt-2" />
                        Publicando...
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalBasic>
  );
}
