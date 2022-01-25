import { dbConnect } from "../../../../config/db";
import { cors, runMiddleware } from "../../../../middlewares/cors";
import Message from "../../../../models/message";

// Obtener los mensajes de un chat
// http://localhost:300/api/chat/[idchat]/messages
export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { idchat } = req.query;

  const messages = await Message.find({ idChat: idchat }).populate("idUser");

  return res.status(200).send(messages);
}