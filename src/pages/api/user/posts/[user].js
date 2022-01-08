import { cors, runMiddleware } from "../../../../middlewares/cors";
import { dbConnect } from "../../../../config/db";
import Post from "../../../../models/post";
import User from "../../../../models/user";

dbConnect();

// http://localhost:3000/api/user/posts/1412041041
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET")
    return res.status(400).send({ error: "Metodo no soportado" });

  const { user: username } = req.query;

  const userFound = await User.findOne({ username }).exec();
  const posts = await Post.find({ idUser: userFound._id }).exec();

  if (!posts) return res.status(404).send({ error: "Error al obtener posts" });

  return res.status(200).send(posts);
}
