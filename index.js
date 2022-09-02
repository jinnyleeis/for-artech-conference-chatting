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

  socket.on("send",function(data){console.log("message from user: ",data.content)})
  socket.on("disconnect",function(){console.log("user disconnected")})
  })

server.listen(8080, function(){
    console.log('server is now running!, listner 실행.')});



