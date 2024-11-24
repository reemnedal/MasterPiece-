const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');    
const pool = require("./config/db");  
const app = express();
const routes = require('./routes/routes');
const photographer = require('./routes/photographer');
const path = require('path');
app.use(bodyParser.json());
app.use(cookieParser());                   
// Middleware
app.use(express.json()); 
 
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


 app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);
app.use('/api/pho', photographer);
 
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
     
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"]
//     }
// });

// const rooms = new Map();

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('joinRoom', (roomId) => {
//         // Leave previous rooms
//         socket.rooms.forEach(room => {
//             if (room !== socket.id) {
//                 socket.leave(room);
//             }
//         });

//         // Join new room
//         socket.join(roomId);
//         console.log(`${socket.id} joined room ${roomId}`);

//         // Initialize room if it doesn't exist
//         if (!rooms.has(roomId)) {
//             rooms.set(roomId, new Set());
//         }

//         const room = rooms.get(roomId);
//         room.add(socket.id);

//         // Send existing users to the new participant
//         const existingUsers = Array.from(room).filter(id => id !== socket.id);
//         socket.emit('existingUsers', existingUsers);

//         // Notify others in the room
//         socket.to(roomId).emit('userJoined', socket.id);

//         // Send room joined confirmation
//         io.to(socket.id).emit('roomJoined', {
//             roomId,
//             userCount: room.size
//         });

//         // Broadcast updated user count
//         io.to(roomId).emit('userCount', room.size);
//     });

//     socket.on('offer', ({ offer, targetUser, roomId }) => {
//         socket.to(targetUser).emit('offer', { 
//             offer, 
//             from: socket.id 
//         });
//     });

//     socket.on('answer', ({ answer, targetUser }) => {
//         socket.to(targetUser).emit('answer', { 
//             answer, 
//             from: socket.id 
//         });
//     });

//     socket.on('ice-candidate', ({ candidate, targetUser }) => {
//         socket.to(targetUser).emit('ice-candidate', { 
//             candidate, 
//             from: socket.id 
//         });
//     });
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
      
//       rooms.forEach((users, roomId) => {
//           if (users.has(socket.id)) {
//               users.delete(socket.id);
//               // Notify others that user has left
//               socket.to(roomId).emit('userLeft', socket.id);
              
//               if (users.size === 0) {
//                   rooms.delete(roomId);
//               } else {
//                   // Update user count for remaining users
//                   io.to(roomId).emit('userCount', users.size);
//               }
//           }
//       });
//   });
// });

// server.listen(5000, () => {
//     console.log('Server is running on http://localhost:5000');
// });




