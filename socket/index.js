import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const rooms = {}; // Store room information, including code
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  // User joins a room
  socket.on("room:join", (data) => {
    const { email, room } = data;
    console.log("User email:", email); // Log to verify email is correct
    console.log("Joining room:", room); // Log to verify the room ID
  
    if (!room) {
      console.error("Room ID is missing!");
      return; // Prevent further actions if the room ID is invalid
    }
  
    if (!rooms[room]) {
      rooms[room] = { code: "" }; // Initialize room if not exists
    }
  
    socket.join(room);
    io.to(socket.id).emit("code:update", { room, code: rooms[room].code });
    io.to(room).emit("user:joined", { email, id: socket.id });
  
    io.to(socket.id).emit("room:join:success", { room });
  });
  
  
  // Listen for code updates and broadcast to other users in the room
  socket.on("code:update", ({ room, newCode }) => {
    console.log(`Broadcasting updated code to room ${room}`);
    if (!room || !rooms[room]) {
      console.error("Room not found or invalid:", room);
      return;
    }
  
    rooms[room].code = newCode; // Update the code for the room
    socket.to(room).emit("code:update", { room, code: newCode });
  });
  

  // Handle peer-to-peer video call signaling
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
