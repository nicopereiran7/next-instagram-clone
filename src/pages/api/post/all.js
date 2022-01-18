import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import Post from "../../../models/post";

export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const allPosts = await Post.find();

  return res.status(200).send(allPosts);
} 