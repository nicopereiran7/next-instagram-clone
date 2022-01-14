import { cors, runMiddleware } from "../../../../../middlewares/cors";
import { dbConnect } from "../../../../../config/db";
import User from "../../../../../models/user";
import Follow from "../../../../../models/follow";

export default async function handler(req, res) {
  await dbConnect();
  await runMiddleware(req, res, cors);

  if (req.method !== "GET")
    return res.status(400).send({ error: "Metodo no soportado" });

  const { user, followed } = req.query;
  if (!user || !followed)
    return res.status(404).send({ error: "Parametros requeridos" });

  const userToFollowFound = await User.findOne({ username: followed }).exec();
  if (!userToFollowFound)
    return res.send(404).send({ error: "Usuario no encontrado" });

  const isFollow = await Follow.findOne({ idUser: user })
    .where("followed")
    .equals(userToFollowFound._id);
  if (!isFollow) return res.status(200).json({ isFollow: false });

  return res.status(200).json({ isFollow: true });
}
