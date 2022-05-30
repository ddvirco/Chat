const io = require("socket.io");

let socketsManager;

function start(listener){
    // Connect once to socket.io library:
    socketsManager = io( listener, { cors: {origin : "http://localhost:3000"}});

    // Listen to any client connection:
    socketsManager.sockets.on("connection", (socket) => {

        console.log("One client connected"+" "+ socket.id);

        socket.on("disconnect", () => {
            console.log("minus one..." + " " + parseInt(socketsManager.engine.clientsCount -1))
        });

        // -------------
        // socket.on("messageFromClient", msg => {
        //     console.log("Client sent message: ", msg);
        //     socketsManager.sockets.emit("messageFromServer", msg);
        // });
        // --------------

        socket.on("room", data => {
        socket.join(data);
        console.log(`User ${socket.id} joined to room ${data}`)    
        })

        socket.on("messageFromClient", msg => {
            socketsManager.sockets.to(msg.room).emit("messageFromServer", msg)
            console.log("Client sent message: ", msg);
            // socketsManager.sockets.emit("messageFromServer", msg);
        });


    });
}

module.exports = {
    start
}