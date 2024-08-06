const socket = io();

const peer = new Peer(undefined, {
    host: '/',
    port: '3001',
    path: '/peerjs'
});


peer.on('open', id => {
    socket.emit('user_join_room', ROOM_ID, id);
});

const grid = document.querySelector("#video-grid");

const createVideo = () => {
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    return video;
}

const myVideo = createVideo();
const users = {};

navigator
    .mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(stream => {
        addVideoSteam(myVideo, stream);
        peer.on('call', call => {
            console.log(`answer call`);
            call.answer(stream);
            const video = createVideo();
            call.on('stream', remoteStream => {
                console.log(`remote user stream`);
                addVideoSteam(video, remoteStream);
            })
        });

        socket.on('user_joined_room', userId => {
            console.log(`${userId} joined the room`);
            callNewUser(userId, stream)
        });

        socket.on('user_closed_room', userId => {
            console.log(`${userId} disconnected`);
            if (users[userId]) {
                users[userId].close();
            }
        });

    }).catch(err => {
        console.log(err)
    });




const callNewUser = (userId, stream) => {
    console.log(`${userId} calling`);

    setTimeout(() => {
        const video = createVideo();
        const call = peer.call(userId, stream);
        call.on('stream', remoteStream => {
            console.log(`${userId} called user stream`);
            addVideoSteam(video, remoteStream);
        });

        call.on('close', () => {
            video.remove();
        });

        users[userId] = call;
    }, 100);
}

const addVideoSteam = async (video, stream) => {
    video.srcObject = stream;
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.innerText = 'User ' + Math.floor(Math.random() * 10);

    span.style.display = 'block';
    span.style.textAlign = 'center';
    span.style.fontWeight = 700;
    span.style.margin = '5px';

    div.appendChild(span);
    div.appendChild(video);

    grid.append(div);
}