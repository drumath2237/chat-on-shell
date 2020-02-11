const io = require('socket.io-client')
const socket = io('https://drumath-socket-chat.herokuapp.com')

process.stdin.resume();
process.stdin.setEncoding('utf8');

let user_name = null;
process.stdout.write('user name: ');

socket.on('connect', ()=>{
  socket.on('message', (data)=>{
    console.log("\n" + data.name + ": " + data.msg);
  })
})

process.stdin.on('data', (chunk)=>{
  if(!user_name){
    user_name = chunk.trim();
    return ;
  }

  socket.emit('message', {
    message: chunk.trim(),
    name: user_name
  })
})


