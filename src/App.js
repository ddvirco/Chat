import logo from './logo.svg';
import './App.css';
import ChatApp from './Components/Chat';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3001")

function App() {

    const [room, setRoom] = useState("")
    const [username, setUsername] = useState("")
    const [userLog, setUserLog] = useState(false)

    function joinChat() {
        if(username !== "" && room !==""){
            socket.emit("room",room)
            setUserLog(!userLog)
        }
    }

    return (
        <div className="App">
            <h3>App </h3>
            <div className="joinChatContainer">
                {userLog == true
                    ?
                    (<ChatApp socket={socket} username={username} room={room} logOut={joinChat} />)
                    :
                    <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input type="text" placeholder="Enter your name..." onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)} />
                        <button onClick={joinChat} >Join</button>
                    </div>

                }
            </div>

        </div>
    );
}

export default App;
