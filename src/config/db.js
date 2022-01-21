import { connect, connection } from "mongoose";
import Pusher from "pusher";

const PUSHER_APP_ID = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;
const PUSHER_SECRET = process.env.NEXT_PUBLIC_PUSHER_SECRET;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

const comn = {
  isConnected: false,
};

// const pusher = new Pusher({
//   appId: PUSHER_APP_ID,
//   key: PUSHER_KEY,
//   secret: PUSHER_SECRET,
//   cluster: PUSHER_CLUSTER,
//   useTLS: true
// });

export async function dbConnect() {
  if (comn.isConnected) return;
  console.log("Conectando MongoDB...");
  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  comn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("MongoDB conectada");
});

connection.on("error", (error) => {
  console.log(error);
});

// connection.once("open", () => {
//   console.log("DB opened");

//   const postsCollection = connection.collection("posts");
//   const changeStream = postsCollection.watch();

//   SE EJECUTA CADA VEZ QUE SE CREA UNA PUBLICACION
//   changeStream.on("change", (change) => {
//     if(change.operationType === "insert") {
//       const postDetails = change.fullDocument;

//       pusher.trigger("posts", "inserted", {

//       })
//     }
//   })
// })
