import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req, res) {
  if(!req.socket.server.io) {
    // console.log("Socket.io server...");

    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    res.socket.server.io = io;
  }
  res.end();
}