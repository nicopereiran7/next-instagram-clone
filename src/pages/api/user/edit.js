import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await dbConnect();

  if (req.method !== "POST")
    return res.status(400).send({ error: "Metodo no soportado" });

  const data = await req.body;
  const { name, username, email, description, site } = data;
  const { autorization: token } = req.headers;
  const user = jwt.verify(token, process.env.SECRET_KEY);

  const form = {
    name,
    username,
    email,
    description,
    siteWeb: site
  }

  const userUpdate = await User.findByIdAndUpdate(user.id, form).exec();
  if (!userUpdate)
    return res.status(400).send({ error: "Error al guardar cambios" });

  return res.status(200).json({ userUpdate });
}