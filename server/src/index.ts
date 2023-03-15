import "dotenv/config";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("User connected");
  socket.send("Hi there I`m socket server and you are connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server started and is listening on port ${process.env.PORT}`);
});
