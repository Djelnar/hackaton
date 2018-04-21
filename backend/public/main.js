var socket = new WebSocket("ws://localhost:3010");
socket.onopen = function() {
  console.log("connected");
};

// socket.onclose = function(event) {
//   if (event.wasClean) {
//     alert('Соединение закрыто чисто');
//   } else {
//     alert('Обрыв соединения'); // например, "убит" процесс сервера
//   }
//   alert('Код: ' + event.code + ' причина: ' + event.reason);
// };

socket.onmessage = function(event) {
  console.log("recieved ", event.data);
};

socket.onerror = function(error) {
  alert("error ", error.message);
};

fetch({
  url: "localhost:3000/users",
  method: 'post',
  body: JSON.stringify({
    name: '8934293423',
    interests: [
      'you',
      'have',
      'some',
      'interests'
    ]
  })
}).then((res)=> console.log(res.status)).catch((e) => console.log(e))