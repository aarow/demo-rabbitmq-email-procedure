import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io();

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, JSON.parse(data)]);
    });
  }, []);

  return (
    <div className="App">
      <h1>RabbitMQ Messages</h1>
      <table>
        <thead>
          <th>
            <td>Index</td>
            <td>Time</td>
            <td>Name</td>
            <td>Email</td>
            <td>Message</td>
          </th>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{msg.timestamp}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
