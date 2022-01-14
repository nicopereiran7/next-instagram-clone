import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import jwt from "jsonwebtoken";
import Like from "../../../models/like";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await dbConnect();

  if(req.method !== "POST") return res.status(400).send({ error: "Metodo no soportado" });

  try {
    const data = req.body;
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    
    const result = await Like.findOneAndDelete({ idPost: data.idPost }).where({ idUser: user.id });
    if(!result.ok) return res.status(200).send({ isLike: true });
    
    return res.status(200).send({ islike: false });
  }catch(err) {
    return res.status(400).send({ islike: true })
  }
}