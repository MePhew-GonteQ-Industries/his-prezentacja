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

  socket.on("joinRoom", (room: string) => {
    socket.join(room);
    console.log(`User with ${socket.id} joined room ${room}`);
    if (room === "players") {
      io.to("players").emit("message", "Witaj w pokoju graczy");
    }
    if (room === "spectators") {
      io.to("spectators").emit("message", "Witaj w pokoju widzów");
    }
  });

  socket.on("disconnect", () => {
    for (const [key] of Object.entries(names)) {
      if (names[key] === socket.id) {
        delete names[key];
      }
    }
    console.log(names);
    console.log(`User with id: ${socket.id} disconnected`);
  });

  socket.on("message", (message: string) => {
    console.log(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("saveName", (name: string) => {
    console.log(`Client's socket id: ${socket.id}, name: ${name}`);
    if (nameExist(name)) {
      console.log(names);
      io.to(names[name]).emit("nameNotRegistered", "Imię jest już zajęte!");
    } else {
      names[name] = socket.id;
      io.to(names[name]).emit("nameRegistered", "Zapraszamy do gry!");
      console.log(names);
    }
  });

  socket.on("posX", (posX: number) => {
    console.log(`PosX: ${posX}`);
    const user = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    io.to("spectators").emit("posX", posX, user);
  });

  socket.on("posY", (posY: number) => {
    console.log(`PosY: ${posY}`);
    const user = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    io.to("spectators").emit("posY", posY, user);
  });

  socket.on("rotation", (rotation: number) => {
    console.log(`Rotation: ${rotation}`);
    const user = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    io.to("spectators").emit("rotation", rotation, user);
  });
});

server
  .listen(process.env.PORT, () => {
    console.log(`Server started and is listening on port ${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
