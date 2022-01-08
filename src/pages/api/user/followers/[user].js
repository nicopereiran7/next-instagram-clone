import { cors, runMiddleware } from "../../../../middlewares/cors";
import User from "../../../../models/user";
import Follow from "../../../../models/follow";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const { user } = req.query;

  const userFound = await User.findOne({ username: user }).exec();
  if (!userFound)
    return res.status(404).send({ error: "Usuario no encontrado" });

  const followers = await Follow.find({ followed: userFound._id })
    .populate("idUser")
    .exec();

  return res.status(200).send(followers);
}
