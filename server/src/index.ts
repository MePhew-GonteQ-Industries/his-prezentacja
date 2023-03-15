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

interface namesInterface {
  [name: string]: string;
}

let names: namesInterface = {};

const nameExist = (name: string) => {
  return names[name] !== undefined;
};

io.on("connection", (socket: Socket) => {
  console.log(`User with id: ${socket.id} connected`);

  socket.on("disconnect", () => {
    for (const [key, value] of Object.entries(names)) {
      if (names[key] === socket.id) {
        delete names[key];
      }
    }
    console.log(`User with id: ${socket.id} disconnected`);
  });

  socket.on("message", (message: string) => {
    console.log(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("saveName", (name: string) => {
    console.log(`Client's socket id: ${socket.id}, name: ${name}`);
    if (nameExist(name)) {
      console.log("name taken");
    } else {
      names[name] = socket.id;
    }
  });
});

server
  .listen(process.env.PORT, () => {
    console.log(`Server started and is listening on port ${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
