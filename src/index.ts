import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig";
import roomHandler from "./handlers/RoomHandler";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("new user connected");
    roomHandler(socket); // pass the socket for the room creation and join
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`server started at port ${ServerConfig.PORT}`);
});
