import { connect, connection } from "mongoose";

const comn = {
  isConnected: false,
};

export async function dbConnect() {
  if (comn.isConnected) return;
  console.log("Conectando MongoDB...");
  const db = await connect(process.env.DB_URI, {
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
