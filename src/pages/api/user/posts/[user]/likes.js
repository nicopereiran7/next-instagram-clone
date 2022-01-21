import { cors, runMiddleware } from "../../../../../middlewares/cors";
import { dbConnect } from "../../../../../config/db";
import Post from "../../../../../models/post";
import Like from "../../../../../models/like";

// Obtener los likes de los usuarios a los posts del usuario autenticado
// http://localhost:3000/api/user/posts/3283523858235/likes
export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { user: userid } = req.query;

  const postsUser = await Post.find({ idUser: userid });

  const userLikeMyPostList = [];
  for await(const post of postsUser) {
    const isLike = await Like.findOne().where("idPost").equals(post._id).populate("idUser").populate("idPost");
    
    if(isLike && isLike.idUser.toString() !== userid.toString()) {
      userLikeMyPostList.push(isLike);
    }
  }

  return res.status(200).send(userLikeMyPostList);
}