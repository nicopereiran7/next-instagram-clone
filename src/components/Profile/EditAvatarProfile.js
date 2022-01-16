import { useCallback, useEffect, useState } from "react";
import ModalBasic from "../Modal/ModalBasic";
import { useDropzone } from "react-dropzone";
import { getToken } from "../../utils/localStorage";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserAuthAllData } from "../../store/slices/userAuthSlice";
 
export default function EditAvatarProfile({ userAuth }) {
  const [openModal, setOpenModal] = useState(false);
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserAuthAllData());
  }, [reload]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      setIsUploadImage(true);
      const file = acceptedFiles[0];

      const data = new FormData();
      data.append("data", file);

      const headers = new Headers({
        "Authorization": `${getToken()}`,
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/upload/avatar`, {
        method: "POST",
        headers,
        body: data,
      });

      if(res.status === 200) {
        const result = await res.json();
        setIsUploadImage(false);
        toast.success(result.ok);
        closeModal();
        setReload(true);
      }else {
        toast.error("Error al subir imagen");
      }
    } catch (error) {
      console.log(error);
      setIsUploadImage(false);
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <div className="flex gap-4 items-center mb-4">
      <div className="flex-[0.4_1_0%] flex justify-end">
        <div className="w-[40px] h-[40px]">
          <img
            className="w-full h-full object-cover rounded-full"
            src={userAuth?.avatar || "/assets/avatar.png"}
            alt={userAuth?.username}
          />
        </div>
      </div>
      <div className="flex-[0.6_1_0%]">
        <h2 className="text-xl">{userAuth?.username}</h2>
        <p
          className="text-[14px] font-semibold hover:cursor-pointer text-sky-500"
          onClick={() => setOpenModal(true)}
        >
          Cambiar foto de perfil
        </p>
      </div>
      <ModalBasic
        openModal={openModal}
        closeModal={closeModal}
        title="Cambiar Foto de perfil"
      >
        <div>
          <p
            className="py-4 px-4 text-center text-sky-600 font-semibold hover:cursor-pointer hover:bg-gray-200"
            {...getRootProps()}
          >
            {isUploadImage ? (
              <CircularProgress size={14} className="mt-2" />
            ) : (
              "Subir Foto"
            )}
          </p>
          <input {...getInputProps()} />
          <p
            className="py-4 px-4 text-center text-red-500 hover:cursor-pointer hover:bg-gray-200"
            onClick={closeModal}
          >
            Cancelar
          </p>
        </div>
      </ModalBasic>
    </div>
  );
}
