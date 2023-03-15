import "dotenv/config";
import express, { json } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import apiRouter from "./routes/router";

const app = express();

app.use(json());
app.use("/api", apiRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`User with id: ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`User with id: ${socket.id} disconnected`);
  });

  socket.on("message", (message: string) => {
    console.log(message);
    socket.broadcast.emit("message", message);
  });
});

server
  .listen(process.env.PORT, () => {
    console.log(`Server started and is listening on port ${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
