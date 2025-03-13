
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your client URL
      methods: ["GET", "POST"],
    },
  });


  const rooms = new Map();
  // Track connected users interested in bus updates
  const busSubscribers = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle document collaboration
    socket.on("join-room", ({ roomId, username }) => {
      console.log(`${username} joined room ${roomId}`);
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, { content: "", users: new Set() });
      }

      const room = rooms.get(roomId);
      room.users.add(username);

      socket.emit("load-document", room.content);

      io.to(roomId).emit("user-count", room.users.size);
    });

    socket.on("send-changes", ({ delta, roomId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.content = delta;
        socket.broadcast.to(roomId).emit("receive-changes", delta);
      }
    });

    socket.on("draw", ({ drawLine, roomId }) => {
      socket.broadcast.to(roomId).emit("receive-drawing", drawLine);
    });



    socket.on("disconnect", () => {
      console.log("A user disconnected");

      // Clean up document rooms
      rooms.forEach((room, roomId) => {
        if (room.users.size === 0) {
          rooms.delete(roomId);
        }
      });


    });
  });



server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


