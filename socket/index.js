import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend origin
    methods: ['GET', 'POST'], // Add any additional HTTP methods you need
  },
});

let users = [];

const addUser = (userId, socketId) => {
  // Use some to check if a user with the same userId already exists
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  // When a user connects
  console.log('A user connected.');

  // Take userId and socketId from the user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // Send and get messages
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

server.listen(8900, () => {
  console.log('Server is running on port 8900');
});