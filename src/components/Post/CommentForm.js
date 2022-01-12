import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { getToken } from "../../utils/localStorage";

export default function CommentForm({ idPost }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: null,
    onSubmit: async (formData, { resetForm }) => {
      try {
        setIsLoading(true);
        const finalData = {
          comment: formData.comment,
          idPost,
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment/add`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${getToken()}`
          },
          body: JSON.stringify(finalData),
        })
        if(res.status === 200) {
          const result = await res.json();
          console.log(result);
          setIsLoading(false);
          resetForm();
        }
      }catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  })
  return (
    <form className="flex items-center p-4" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Agregar un comentario"
        className="text-sm focus:outline-none flex flex-grow"
        name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
      />
      {formik.values.comment === "" ? (
        <p className="text-sky-300">Publicar</p>
      ) : (
        <button className="text-sky-500" type="submit">
          {isLoading ? (
            <CircularProgress size={14} className="mt-2"/>
          ):(
            "Publicar"
          )}
        </button>
      )}
      
    </form>
  )
}