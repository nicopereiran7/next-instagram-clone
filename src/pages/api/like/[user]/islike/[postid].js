import { cors, runMiddleware } from "../../../../../middlewares/cors";
import { dbConnect } from "../../../../../config/db";
import Like from "../../../../../models/like";

// Verificar si el usuario autenticado a dado like a un post
// http://localhost:3000/api/like/[user]/islike/p[postid]
export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { user, postid } = req.query;

  const likeFounded = await Like.findOne({ idPost: postid }).where({ idUser: user }).exec();
  if(!likeFounded) return res.status(200).send({ isLike: false });

  return res.status(200).send({ isLike: true });
}