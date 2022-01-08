import { dbConnect } from "../../../config/db";
import { cors, runMiddleware } from "../../../middlewares/cors";
import User from "../../../models/user";

dbConnect();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET")
    return res.status(400).send({ error: "Metodo no soportado" });

  const { term } = req.query;
  const users = await User.find({
    name: { $regex: term, $options: "i" },
  }).exec();

  if (users.length === 0)
    return res.status(404).send({ error: "No hay resultados de busqueda" });

  return res.status(200).send(users);
}
