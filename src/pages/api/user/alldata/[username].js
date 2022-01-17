import User from "../../../../models/user";
import Follow from "../../../../models/follow";
import Post from "../../../../models/post";
import { dbConnect } from "../../../../config/db";
import { cors, runMiddleware } from "../../../../middlewares/cors";

// GET: http://localhost:3000/api/user/alldata/nico123
export default async function handler(req, res) {
  await dbConnect();
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "GET":
      const { username } = req.query;
      const userFound = await User.findOne({ username }).exec();
      const followers = await Follow.find({ followed: userFound._id }).populate("idUser");
      const followed = await Follow.find({ idUser: userFound._id }).populate("followed");
      const posts = await Post.find({ idUser: userFound._id }).sort({ createdAt: -1 });
      // const countPosts = await Post.countDocuments({ idUser: userFound._id }).exec();

      if (!userFound)
        return res
          .status(404)
          .send({ error: `El usuario ${username} no existe` });

      const data = { userFound, followers, followed, posts };
      return res.status(200).send(data);
    default:
      return res.status(400).send({ error: "Metodo no soportado" });
  }
}