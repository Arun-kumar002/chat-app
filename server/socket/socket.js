import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv'

dotenv.config()

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [process.env.URL], // Allow requests from localhost:3000
    methods: ["GET", "POST"], // Allow specified HTTP methods
  },
});

// Map to store user IDs and corresponding socket IDs
const userSocketMap = {};

// Function to get socket ID of a receiver user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Handle socket connection event
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Extract userId from handshake query
    const userId = socket.handshake.query.userId;

    // Store userId and socketId mapping
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle socket disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        // Remove user from userSocketMap on disconnect
        delete userSocketMap[userId];
        // Emit updated online users event to all connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export Express app, Socket.IO instance, and HTTP server
export { app, io, server };
