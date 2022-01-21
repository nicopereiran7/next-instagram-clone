import { cors, runMiddleware } from "../../../../middlewares/cors";
import { dbConnect } from "../../../../config/db";
import User from "../../../../models/user";
import Follow from "../../../../models/follow";

// http://localhost:8080/api/follow/[user]/notfollow
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await dbConnect(req, res);

  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  const { user: id } = req.query;
  // get all users
  const users = await User.find().limit(20);

  const usersNotFollowed = [];
  for await(const user of users) {
    const isFind = await Follow.findOne({ idUser: id }).where("followed").equals(user._id);

    if(!isFind && user._id.toString() !== id.toString()) {
      usersNotFollowed.push(user);
    }
  }

  return res.status(200).send(usersNotFollowed);
}