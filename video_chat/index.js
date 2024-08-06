const express = require('express');
const app = express();
const { createServer } = require('http');
const cors = require("cors");
const { Server } = require('socket.io');

const server = createServer(app);


const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('user_join_room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user_joined_room', userId);
        socket.on('disconnect', () => {
            console.log(`${userId} disconnected`);
            socket.to(roomId).emit('user_closed_room', userId)
        })
    });


});


const uuid = require('uuid');

app.use(express.static('public'));

app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(`/${uuid.v4()}`);
});

app.get('/:room', (req, res) => {
    return res.render('chat', { roomId: req.params.room });
});


server.listen(3000, (err, res) => {

});