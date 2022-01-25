import { dbConnect } from "../../../../config/db";
import { cors, runMiddleware } from "../../../../middlewares/cors";
import Chat from "../../../../models/chat";

// Obtener los chats de un usuario
// http://localhost:300/api/chat/user/[user]
export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });
 
  await runMiddleware(req, res, cors);
  await dbConnect();

  const { user: idUser } = req.query;

  const userChats = await Chat.find({ members: idUser }).populate("members");

  return res.status(200).send(userChats);
}