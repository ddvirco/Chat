import {  useState } from "react"
import './Chat.css';

function ChatApp({username, socket, logOut, room}) {

    let time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    
    const [allChatMessage, setAllChatMessage] = useState([])
    const [message, setMessage] = useState({ userName: username, msg: '', time: time,room: room })

   function connect() {
         socket.connect(console.log(socket.id))
        socket.on("messageFromServer", (data) => {
            setAllChatMessage((allChatMessage) => [...allChatMessage, data])
        })
        console.log("socket - On" + " " +socket.connected)
    }

    function disconnect() {
        socket.disconnect(console.log(socket.disconnected))
        console.log("socket -Off"+ " " +socket.connected)
        logOut(false)
    }

    function sendData() {
        if(message.msg !== ""){
            setMessage({...message , time: time})
            socket.emit("messageFromClient", message);
        }
    }

    return (
        <div >
            <h3>WebSocket</h3>
            <button onClick={connect}>Connect</button>
            <br />
            <button onClick={disconnect}>Disconnect</button>
            <br />
            <label>Name:</label>
            <input type="text" defaultValue={username} />
            <br></br>
            <label>Message:</label>
            <input type="text" onChange={(e) => setMessage({ ...message, msg: e.target.value })} />
            <button onClick={sendData}>&#9658;</button>
            <br />
            Room: {room}<br/>
            UserName is: {username}
            <br/>
            <div className="chatDiv">
                {allChatMessage.map((item, index) => {
                    return <div key={index}>
                        {item.userName === message.userName ?
                            <div className="yourMessage"><strong>{item.msg}</strong> , {item.time} </div>
                            :
                            <div className="otherMessage"><strong>{item.userName}: </strong>{item.msg}, {item.time}</div>}
                        <br />
                    </div>
                })}
            </div>
        </div>)

};

export default ChatApp