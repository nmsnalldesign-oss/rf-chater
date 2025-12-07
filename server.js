const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const users = new Map();
const rooms = new Map();

// REST endpoints
app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// WebSocket handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (name) => {
    users.set(socket.id, { id: socket.id, name, status: 'online' });
    io.emit('users-list', Array.from(users.values()));
  });

  socket.on('message', (msg) => {
    io.emit('message', { sender: users.get(socket.id)?.name || 'Unknown', ...msg });
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    if (!rooms.has(roomId)) rooms.set(roomId, []);
    rooms.get(roomId).push(socket.id);
    io.to(roomId).emit('user-joined', { userId: socket.id, total: rooms.get(roomId).length });
  });

  socket.on('signal', ({ roomId, target, data }) => {
    io.to(target).emit('signal', { from: socket.id, data });
  });

  socket.on('disconnect', () => {
    users.delete(socket.id);
    console.log('User disconnected:', socket.id);
    io.emit('users-list', Array.from(users.values()));
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`RF Chater Server running on port ${PORT}`);
});
