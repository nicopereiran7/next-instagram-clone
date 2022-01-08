import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import User from "../../../models/user";
import Follow from "../../../models/follow";

dbConnect();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST")
    return res.status(400).send({ error: "Metodo no soportado" });
  //
  const { userAuthId, followed } = req.body;
  if (!userAuthId || !followed)
    return res.status(404).send({ error: "Parametros requeridos" });

  const userToFollowFound = await User.findOne({ username: followed }).exec();
  if (!userToFollowFound)
    return res.send(404).send({ error: "Usuario no encontrado" });

  const unfollow = await Follow.deleteOne({ idUser: userAuthId })
    .where("followed")
    .equals(userToFollowFound._id);
  if (!unfollow.ok) return res.status(200).send({ isFollow: false });

  return res.status(404).send({ isFollow: true });
}
