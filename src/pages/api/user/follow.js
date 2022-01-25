import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import User from "../../../models/user";
import Follow from "../../../models/follow";

// Seguir a un usuario
export default async function handler(req, res) {
  await dbConnect();
  await runMiddleware(req, res, cors);

  if (req.method !== "POST")
    return res.status(400).send({ error: "Metodo no soportado" });

  const { userAuthId, userToFollow } = req.body;
  if (!userAuthId || !userToFollow)
    return res
      .status(400)
      .send({ error: "Necesita el usuario autenticado y el usuario a seguir" });

  const userToFollowFound = await User.findOne({
    username: userToFollow,
  }).exec();
  if (!userToFollowFound)
    return res.status(404).send({ error: "El usuario no se encuentra" });

  try {
    const follow = new Follow({
      idUser: userAuthId,
      followed: userToFollowFound._id,
    });

    const followSaved = await follow.save();
    return res.status(200).send(followSaved);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}
