const express = require('express');//서버
const http = require('http');//서버
const socket = require('socket.io');//실시간 서버-클라이언트 채팅
//8번째 커밋에서 모듈 추가
const fs =require("fs");//파일관련 처리하는 node.js 기본제공 모듈 ex)readFile


const express1= express();//express 객체

const server = http.createServer(express1);//express로부터 server 생성
const io = socket(server)
//8번째 커밋
//for middleware <use메소드> 클라이언트가, 서버로 엑세스할 때,생성한 css파일로 엑세스 할 수 있도록 엑세스 허용 코드
express1.use('/css', express.static('./static/css'))
express1.use('/js', express.static('./static/js'))

//8번째 커밋 
//html파일내용, 클라이언트에게 내용 전달해야. - get 함수 코드 수정.
express1.get('/', function(request,response){
console.log("user entered!")//server에 나올것.,
//response.send("client: hello express server"), console.log("hi")
fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('error')
    } else {
      response.writeHead(400, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })});

  //connect 이벤트 기반으로 , send, disconnect이벤트 발생할 것임
 io.sockets.on("connection",function(socket){
    console.log("user connected to server")

    socket.on('newusernotify', function(name) {
        console.log(name + '  ENTERED!')
    
        //socket에 뉴유저 이름 저장.
        socket.name = name
    
       //모든 소켓들에게 전송!!
        io.sockets.emit('update', {type: 'connect', name: 'ATC2022', message: name + 'entered!!!.'})
      })
    

  socket.on("message",function(data){
    data.name = socket.name//해당데이터 보낸사람은 소켓에서 알 수 있으니까, 이를 저장.
    console.log(data)
    io.sockets.emit('update', data) 
   // socket.broadcast.emit('update', data)//보낸사람 제외 나머지 유저에게 메시지 전송/
   })
  socket.on("disconnect",function(){console.log(socket.name+" disconnected")
  socket.broadcast.emit('update', {type: 'disconnect', name: 'ATC2022', message: socket.name + 'exit.'});
  //나간사람제외 메시지 전송.
})
  })


  
  
  


server.listen(8080, function(){
    console.log('hi server now runnig.., listner 실행.')});



