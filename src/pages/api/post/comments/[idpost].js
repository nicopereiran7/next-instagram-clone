import { cors, runMiddleware } from "../../../../middlewares/cors";
import { dbConnect } from "../../../../config/db";
import Comment from "../../../../models/comment";

export default async function handler(req, res) {
  await dbConnect();
  await runMiddleware(req, res, cors);

  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  const { idpost } = req.query;

  const comments = await Comment.find({ idPost: idpost }).populate("idUser").exec();
  if(!comments) return res.status(404).send({ error: "No se han encontrado comentarios" });

  return res.status(200).send(comments);
}