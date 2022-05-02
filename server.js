//socketIO
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//get & send html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');
});

//sockets IO
io.on('connection', (socket) => {

  //check connection
  console.log('user connected');

  //при имитации события 'message' добавится на страницу новый тег с информацией 'test'
  socket.emit('message', 'test');

  //check disconnection
  socket.on('disconnect', () => console.log('user disconnected'));

});

//listen port
http.listen(4000, () => console.log('listen port 4000'));





//work on progress

// fetch('http://localhost:4000')
//   .then(data => {
//     console.log(data);
//   })
