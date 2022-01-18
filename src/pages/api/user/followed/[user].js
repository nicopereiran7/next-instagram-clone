import { cors, runMiddleware } from "../../../../middlewares/cors";
import User from "../../../../models/user";
import Follow from "../../../../models/follow";
import { dbConnect } from "../../../../config/db";

dbConnect();

// obtener usuarios que siguen a un usuario
// http://localhost:300/api/user/followed/[usuario]
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const { user } = req.query;

  const userFound = await User.findOne({ username: user }).exec();
  if (!userFound)
    return res.status(404).send({ error: "Usuario no encontrado" });

  const following = await Follow.find({ idUser: userFound._id })
    .populate("followed")
    .exec();

  return res.status(200).send(following);
}
