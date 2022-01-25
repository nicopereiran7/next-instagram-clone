import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import Message from "../../../models/message";

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { idUser, idChat, message } = req.body;
  if(!idUser || !idChat || !message) return res.status(400).send({ error: "Todos los campos son obligatorios" });

  try {
    const newMessage = new Message({
      idUser,
      idChat,
      message,
    });

    const messageSaved = await newMessage.save();
    res?.socket.server.io.emit("message", messageSaved);
    return res.status(200).send(messageSaved);
    
  }catch(err) {
    return res.status(400).send({ error: err });
  }
}