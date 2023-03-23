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

interface playerPostion {
  id: string;
  name: string | undefined | number;
  posX: number;
  posY: number;
  rotation: number;
}

let names: namesInterface = {};

const nameExist = (name: string) => {
  return names[name] !== undefined;
};

io.on("connection", (socket: Socket) => {
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
    const name = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    io.to("spectators").emit("playerDisconnected", name, socket.id);
  });

  socket.on("message", (message: string) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("saveName", (name: string) => {
    if (nameExist(name)) {
      names[name] = socket.id;
      io.to(names[name]).emit("nameNotRegistered", "Imię jest już zajęte!");
    } else {
      names[name] = socket.id;
      io.to(names[name]).emit("nameRegistered", "Zapraszamy do gry!");
      io.to("spectators").emit("playerConnected", name, socket.id);
    }
  });

  socket.on("position", (posX: number, posY: number, rotation: number) => {
    const user = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    const playerPostion: playerPostion = {
      id: socket.id,
      name: user,
      posX: posX,
      posY: posY,
      rotation: rotation,
    };
    if (user !== undefined) {
      io.to("spectators").emit("position", playerPostion);
    }
  });

  socket.on("playerDisconnected", () => {
    const name = (Object.keys(names) as (keyof typeof names)[]).find((key) => {
      return names[key] === socket.id;
    });
    io.to("spectators").emit("playerDisconnected", name, socket.id);
    for (const [key] of Object.entries(names)) {
      if (names[key] === socket.id) {
        delete names[key];
      }
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
