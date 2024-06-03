// // node server which will handle socket io connections


// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket => {
//     console.log('chlad')
//     socket.on('new-user-joined',name => {
//         console.log("new user",name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name);
//     })

//     socket.on('send', message => {
//         socket.broadcast.emit('receive',{message:message , name: user[socket.id]})
//     })


// })

const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});


const users = {};

io.on('connection', socket => {
    console.log('A user connected', socket.id);

    socket.on('new-user-joined', nam => {
       
        console.log("New user:", nam );
        users[socket.id] = nam;
       
        socket.broadcast.emit('user-joined', nam );
    });

    socket.on('send', message => { 
        socket.broadcast.emit('receive', { message: message, nam: users[socket.id] });
    });

    socket.on('disconnect', message => { 
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id]
    });

   
});
