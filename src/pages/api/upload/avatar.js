import { cors, runMiddleware } from "../../../middlewares/cors";
import { dbConnect } from "../../../config/db";
import parseFile from "../../../middlewares/parseFile";
import nextConnect from "next-connect";
import fs from "fs";
import { awsUploadImage, awsDeleteImage } from "../../../utils/aws-upload-image";
import jwt from "jsonwebtoken";
import User from "../../../models/user";

const handler = nextConnect();
handler.use(parseFile);

handler.post(async (req, res) => {
  await dbConnect();
  await runMiddleware(req, res, cors);

  try {
    const file = req.files;
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);

    const { mimetype, filepath } = await file.data;
    const extension = mimetype.split("/")[1];
    const imageName = `avatar/${user.username}.${extension}`;
    const fileContent = fs.createReadStream(filepath);

    // const avatarUserFound = await User.findById(user.id).exec();
    // if(avatarUserFound.avatar) {
    //   const nameFileAvatar = avatarUserFound.avatar.split("/")[4];
    //   await awsDeleteImage(nameFileAvatar);
    // }
    const result = await awsUploadImage(fileContent, imageName);

    await User.findByIdAndUpdate(user.id, { avatar: result }).exec();

    res.status(200).json({ ok: "Imagen subida correctamente", url: result })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
