import { dbConnect } from "../../../config/db";
import User from "../../../models/user";
import { encodePassword } from "../../../utils/password";
import { cors, runMiddleware } from "../../../middlewares/cors";

dbConnect();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST")
    return res.status(404).send({ error: "Metodo no soportado" });

  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).send({ error: "Todos los campos son obligatorios" });
  }

  const usernameFound = await User.findOne({ username }).exec();
  const emailFound = await User.findOne({ email }).exec();

  if (usernameFound || emailFound) {
    return res.status(400).send({
      error: "El nombre de usuario o email ya esta registrado",
      username: usernameFound ? true : false,
      email: emailFound ? true : false,
    });
  }

  const hash = await encodePassword(password);
  if (!hash) {
    return res.status(400).send({ error: "Error al encriptar contraseña" });
  }

  const newUser = new User({
    name,
    username,
    email,
    password: hash,
    siteWeb: null,
    description: null,
    avatar: null,
    isActive: false,
  });

  try {
    const saveUser = await newUser.save();
    return res.status(200).send(saveUser);
  } catch (e) {
    return res.status(400).send({ error: e });
  }
}
