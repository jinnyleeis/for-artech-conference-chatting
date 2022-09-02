var socket = io()

//접속 되었을 때 실행 
socket.on('connect', function() {
  var input = document.getElementById('test')
  input.value = 'your connection completed'
})

/* 전송 함수 */
function send() {
  // 클라이언트가 직접 입력해서 > 입력되어있는 데이터 가져오기
  var message = document.getElementById('test').value
  
  // 가져왔으니까, 이제 다시 데이터 빈칸으로 변경
  document.getElementById('test').value = ''

  // socket.emit  서버로 send 이벤트 전달 + 데이터와(content) type은 message! 

  socket.emit('send', {content: message})
  //서버코드에는 이 이벤트를 받는 on("send")함수가 존재해야할것.
}
