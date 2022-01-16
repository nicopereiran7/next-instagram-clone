import { cors, runMiddleware } from "../../../../../middlewares/cors";
import { dbConnect } from "../../../../../config/db";
import Follow from "../../../../../models/follow";
import Post from "../../../../../models/post";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(400).send({ error: "Metodo no soportado" });

  await runMiddleware(req, res, cors);
  await dbConnect();

  const { iduser } = req.query;
  const userFolloweds = await Follow.find({ idUser: iduser }).populate("followed").exec();

  const followedsList = [];
  for await (const data of userFolloweds) {
    followedsList.push(data.followed);
  }

  const feedList = [];
  // mis posts
  const myPosts = await Post.find().where({ idUser: iduser }).sort({ createdAt: -1 }).populate("idUser");
  feedList.push(...myPosts);
  // posts de los usuarios que sigo
  for await(const data of followedsList) {
    const postsUser = await Post.find().where({ idUser: data._id }).sort({ createdAt: -1 }).populate("idUser");
    feedList.push(...postsUser);
  }

  const result = feedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.status(200).send(result);
}