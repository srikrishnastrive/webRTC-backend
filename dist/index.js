"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const RoomHandler_1 = __importDefault(require("./handlers/RoomHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        methods: ["GET", "POST"],
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("new user connected");
    (0, RoomHandler_1.default)(socket); // pass the socket for the room creation and join
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(serverConfig_1.default.PORT, () => {
    console.log(`server started at port ${serverConfig_1.default.PORT}`);
});
