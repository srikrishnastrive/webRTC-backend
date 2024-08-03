import { Socket } from "socket.io";
import {v4 as UUIDv4} from "uuid";
import IRoomParams from "../interfaces/iRoomParams";

const roomHandler = (socket: Socket) => {
    /**
     * {1: {u1,u2,u3}}
     * {2 :{u5,u5,u6}}
     */
    const rooms : Record<string,string[]> = {};
    const createRoom = () => {
        const roomId = UUIDv4();
        // this will create the uniqure roomId for multiple connection will exachnage inforamtion
        socket.join(roomId);
        // we will make a socket connection while entering in a romm
        socket.emit("room-created", {roomId});
        // we will emit an event from server side that socket connected successfully
        console.log("create room Id", roomId);
    };
    /**
     * below function executes everytime a 
     * user (creator or joinee) joins a new room
     */
    const joinRoom = ({roomId,peerId} :IRoomParams) => {
        if(rooms[roomId]){
            //If the given roomId exists in the memory db
            console.log("New user  has joined the room",roomId,"with peer id as",peerId);
            //the moment new user joins, 
            //add the peerId to the key of the room Id
            rooms[roomId].push(peerId);
            socket.join(roomId) //make th u
            
        }
        
    };

    // when to call above two function
    // we will call above two functiom when the client will emit event create room and join room.

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};

export default roomHandler;
