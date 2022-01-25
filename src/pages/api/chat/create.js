import { cors, runMiddleware } from '../../../middlewares/cors';
import { dbConnect } from "../../../config/db";
import Chat from "../../../models/chat";

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).send({ error: "Method not allowed" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { members, typechat } = req.body;

  const foundChat = await Chat.findOne({ members });

  if(foundChat) return res.status(200).send({ info: "El chat ya existe" });

  try {
    const newChat = new Chat({
      members,
      typechat,
    });

    const chatSaved = await newChat.save();
    
    return res.status(200).send(chatSaved);
  }catch(e) {
    return res.status(400).send({ error: e });
  }
}