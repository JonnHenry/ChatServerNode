var express = require('express');
var app = express();
var server = require('http').Server(app);
var io =require('socket.io')(server);
var PORT = process.env.PORT || 8080;

app.use(express.static('client'));



var messages =[{
    id:1,
    text: 'Bienvenido al chat',
    nickname:'FastServices'
}];

io.on('connection',function(socket){
    console.log("El cliente con IP: "+ socket.handshake.address+" se ha conectado...");

    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);
    });
});


server.listen(PORT,function(){
	console.log('el servidor esta escuchando el puerto %s',PORT);
});

