import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import jwt from "jsonwebtoken";
import Comment from "../../../models/comment";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await dbConnect();

  if(req.method !== "POST") return res.status(400).send({ error: "Metodo no soportado" });

  try {
    const data = req.body;
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);

    const newComment = new Comment({
      idPost: data.idPost,
      idUser: user.id,
      comment: data.comment,
      createdAt: Date.now(),
    });

    const commentSaved = await newComment.save();

    return res.status(200).send(commentSaved);
  }catch(e) {
    return res.status(400).send({ error: e });
  }
}