const express = require('express');//서버
const http = require('http');//서버
const socket = require('socket.io');//실시간 서버-클라이언트 채팅

const express1= express();//express 객체

const server = http.createServer(express1);//express로부터 server 생성

server.listen(8080, function(){
    console.log('server is now running!, listner 실행.')});
