const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const cors = require("cors");
const listenRabbitMQ = require("./lib/rabbitmq");
const { sendEmail } = require("./lib/email");

const PORT = process.env.PORT;

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./frontend/build")));

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

listenRabbitMQ(io, sendEmail);
