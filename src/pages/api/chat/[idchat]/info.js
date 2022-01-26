import { dbConnect } from "../../../../config/db";
import { cors, runMiddleware } from "../../../../middlewares/cors";
import Chat from "../../../../models/chat";

// Obtener info de un chat
// http://localhost:3000/api/chat/[idchat]/info
export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { idchat } = req.query;

  const chat = await Chat.findById(idchat).populate("members");

  return res.status(200).send(chat);
}