import AWS from "aws-sdk";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ID_SECRET_KEY = process.env.AWS_ID_SECRET_KEY;
const SECRET_KEY = process.env.AWS_KEY;

const s3 = new AWS.S3({
  accessKeyId: ID_SECRET_KEY,
  secretAccessKey: SECRET_KEY,
});

export async function awsUploadImage(file, filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}
