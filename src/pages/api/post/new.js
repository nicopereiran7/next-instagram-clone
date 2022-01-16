import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import parseFile from "../../../middlewares/parseFile";
import nextConnect from "next-connect";
import fs from "fs";
import { awsUploadImage } from "../../../utils/aws-upload-image";
import jwt from "jsonwebtoken";
import Post from "../../../models/post";
import { v4 as uuidv4 } from "uuid";

const handler = nextConnect();
handler.use(parseFile);

handler.post(async (req, res) => {
  await dbConnect();
  await runMiddleware(req, res, cors);

  try {
    const { file } = req.files;
    const { data } = req.body;
    const form = JSON.parse(data);
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);

    const { mimetype, filepath } = await file;
    const extension = mimetype.split("/")[1];
    const type = mimetype.split("/")[0];
    const postName = `post/${uuidv4()}.${extension}`;
    const fileContent = fs.createReadStream(filepath);

    const result = await awsUploadImage(fileContent, postName);

    const newPost = new Post({
      idUser: user.id,
      description: form.description,
      url: result,
      type,
      createdAt: Date.now()
    });

    const postSaved = await newPost.save();
    return res.status(200).json({
      status: true,
      post: postSaved
    });
    // return res.status(200).json({ file, data: form, token, user })

  } catch (e) {
    return res.status(400).json({ status: false, error: e.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;