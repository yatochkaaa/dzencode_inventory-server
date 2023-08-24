let activeSessions = 0;

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");
  activeSessions++;
  io.emit("activeSessionsUpdate", activeSessions);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    activeSessions--;
    io.emit("activeSessionsUpdate", activeSessions);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
