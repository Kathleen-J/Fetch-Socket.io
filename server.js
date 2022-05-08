//import
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const express = require('express');

app.use(express.static('front'));
app.use('/js', express.static(__dirname + '/front/main.js'));

app.get('', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');
});

//счетчик пользователей
let count = 0;

//sockets IO
io.on('connection', (socket) => {


  //счетчик поключенных пользователей
  count += 1; //+1
  console.log(`${count} user(s) connected`);
  socket.emit('userCount', `${count} user(s) online`);
  socket.broadcast.emit('userCount', `${count} user(s) online`);

  socket.on('disconnect', (data) => {
    count -= 1; //-1
    console.log(`${count} user(s) connected`);
    socket.emit('userCount', `${count} user(s) online`);
    socket.broadcast.emit('userCount', `${count} user(s) online`);
  })


  //генерация сообщений с помощью цикла и setTimeout
  for (let i = 0; i < 3; i++) {
   setTimeout( () => {socket.emit('message', 'test')}, 2000 * (i + 1));
  }

  //генерация сообщений с помощью setInterval
  var counter = 0;
  setInterval(function() {
    socket.emit('message', '123');
    if(++counter >= 3) {
        clearInterval(this);
    }
  }, 2000);

});

//listen port
http.listen(4000, () => console.log('listen port 4000'));
