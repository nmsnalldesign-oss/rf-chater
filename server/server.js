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

// REST
app.get('/health', (req, res) => res.json({ ok: true }));

// WebSocket
io.on('connection', (socket) => {
  console.log('Пользователь подключен:', socket.id);

  socket.on('register', (name) => {
    users.set(socket.id, { id: socket.id, name });
    io.emit('users-list', Array.from(users.values()));
  });

  socket.on('message', (msg) => {
    io.emit('message', { sender: users.get(socket.id)?.name || 'Anonymous', text: msg });
  });

  socket.on('join-room', (roomId) => {
    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId).add(socket.id);
    socket.join(roomId);
    io.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('signal', ({ roomId, target, data }) => {
    if (target) io.to(target).emit('signal', { from: socket.id, data });
    else io.to(roomId).emit('signal', { from: socket.id, data });
  });

  socket.on('disconnect', () => {
    users.delete(socket.id);
    rooms.forEach((sockets) => sockets.delete(socket.id));
    io.emit('users-list', Array.from(users.values()));
    console.log('Пользователь отключен:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
