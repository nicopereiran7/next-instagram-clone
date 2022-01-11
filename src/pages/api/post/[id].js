import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import Post from "../../../models/post";
 
export default async function handler(req, res) {
  if(req.method !== 'GET') return res.send(400).send({ error: "Metodo no soportado" });

  await dbConnect();
  await runMiddleware(req, res, cors);

  const { id } = req.query;
  const post = await Post.findById({ _id: id }).populate("idUser").exec();

  if(!post) return res.status(404).send({ error: "El post no existe" })

  return res.status(200).send(post);
} 
