const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()
const WebSocket = require('ws')

const connectedUsers = {}
const connectedDbUsers = {}

let idCounter = 100

const wss = new WebSocket.Server({ port: 3020 });
wss.on('connection', function connection(ws) {
  ws.id = idCounter++;
  connectedUsers[ws.id] = ws;

  ws.send(JSON.stringify({type: 'handshake', sockId: ws.id}));

  ws.on('close', function () {
    delete connectedUsers[ws.id];
    delete ws.id;
  });
  
  ws.on('message', function incoming(message) {
    // console.log('received: ', message)
    let messageData = JSON.parse(message)
    switch(messageData.type){
      case 'handshake':
        // connectedUsers[messageData.sockId].dbId = messageData.userId
        connectedDbUsers[messageData.userId] = connectedUsers[messageData.sockId]
        break
      case 'invite':
      // console.log(connectedDbUsers)
        connectedDbUsers[messageData.recipientId].send(JSON.stringify({
          type: 'invite',
          from: messageData.userName,
          fromGroupName: messageData.fromGroupName,
          fromType: messageData.fromType
        }))
        break
      default:
        console.log(messageData)
    }
    
    // console.log(wss.clients)
  });

  // ws.send('something');
});

server.use(middlewares)
server.use(router)
server.listen(3010, () => {
  console.log('JSON Server is running')
})