const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3020 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // ws.send('something');
});

server.use(middlewares)
server.use(router)
server.listen(3010, () => {
  console.log('JSON Server is running')
})