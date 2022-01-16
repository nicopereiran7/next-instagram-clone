import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import jwt from "jsonwebtoken";
import Like from "../../../models/like";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await dbConnect();

  if(req.method !== "POST") return res.status(400).send({ error: "Metodo no soportado" });

  try {
    const body = req.body;
    const data = JSON.parse(body)
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    const newLike = new Like({
      idPost: data.idPost,
      idUser: user.id
    });
    
    const likeSaved = await newLike.save();
    if(!likeSaved) return res.status(200).send({ like: false }); 
    
    return res.status(200).send({ like: true });
  }catch(err) {
    return res.status(400).send({ error: err })
  }
}