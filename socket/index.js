import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend origin
    methods: ['GET', 'POST'], // Add any additional HTTP methods you need
  },
});

const users = new Map(); // Use a Map for faster lookups

const addUser = (userId, socketId) => {
  users.set(userId, socketId);
};

const removeUser = (socketId) => {
  for (const [userId, id] of users.entries()) {
    if (id === socketId) {
      users.delete(userId);
      break;
    }
  }
};

const getUserSocket = (userId) => {
  return users.get(userId);
};

io.on('connection', (socket) => {
  // When a user connects
  console.log('A user connected.');

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', Array.from(users.keys()));
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const receiverSocketId = getUserSocket(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', Array.from(users.keys()));
  });
});

server.listen(8900, () => {
  console.log('Server is running on port 8900');
});
