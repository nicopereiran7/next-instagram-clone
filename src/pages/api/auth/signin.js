import User from "../../../models/user";
import { comparePassword } from "../../../utils/password";
import { createToken } from "../../../utils/auth";
import { dbConnect } from "../../../config/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(400).send({ error: "Metodo no soportado" });

  const { email, password } = req.body;
  const userFound = await User.findOne({ email }).exec();
  if (!userFound)
    return res.status(404).send({ error: "Usuario o contraseña incorrectos" });

  const passCompare = await comparePassword(password, userFound.password);
  if (!passCompare)
    return res.status(404).send({ error: "Usuario o contraseña incorrectos" });

  const token = createToken(userFound, process.env.SECRET_KEY, "48h");

  return res.status(200).send({ token });
}
