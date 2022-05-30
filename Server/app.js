const express = require("express");
const chatLogic = require("./chat-logic");
const server = express();

const listener = server.listen(3001, () => console.log("Listening to webSocket in Port 3001"))
chatLogic.start(listener);

// -----------------------------------

// const http = require("http")
// const socketIo = require("socket.io")

// const server = http.createServer(socketIo)
// const io = socketIo(server)

// const getApiAndEmit = () => {
//     const response = Date.now()
//     socket.emit("FromAPI", response);
// };

// let interval;

// io.on("connection", (socket) => {
//     console.log("new client connected")
//     if(interval){
//         clearInterval(interval)
//     }
//     interval = setInterval(() => getApiAndEmit(socket),1000);
//     socket.on("disconnect", () => {
//         console.log("client disconnected");
//         clearInterval(interval);
//     });
// });

// server.listen(3001, ()=> { console.log("Example app listening on port 3001")})

// ------------------------------------
// const app = require("express")
// const http = require("http").createServer(app)
// const io = require("socket.io")(http)

// io.on("connection", socket => {
//     socket.on("message", ({name, message}) => {
//         io.emit("message", {name, message})
//     })
// })

// http.listen(4000, () => { console.log("listening to port 4000")})
