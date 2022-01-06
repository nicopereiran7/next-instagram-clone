import User from "../../../models/user";
import { dbConnect } from "../../../config/db";
import { cors, runMiddleware } from "../../../middlewares/cors";

dbConnect();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "GET":
      const { username } = req.query;
      const userFound = await getUser(username);

      if (!userFound)
        return res
          .status(404)
          .send({ error: `El usuario ${username} no existe` });

      return res.status(200).send(userFound);
    default:
      return res.status(400).send({ error: "Metodo no soportado" });
  }
}

// GET: http://localhost:3000/api/user
async function getUser(username) {
  const userFound = await User.findOne({ username }).exec();

  return userFound ? userFound : null;
}
