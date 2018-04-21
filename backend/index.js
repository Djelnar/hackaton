const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3010 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
// const axios = require('axios')
// const cheerio = require('cheerio')

// axios('https://vkevent.ru/popular/')
//   .then(({data}) => {
//     let page = cheerio.load(data)
//     let links = []
//     page('.event_page_link').map((i, el) => {
//       links.push(`https://vkevent.ru${el.attribs.href}`)
//     })
    
//     let promises = links.slice(0, 20).map(link => axios(link))
//     Promise.all(promises)
//       .then((res)=>{
//         console.log(res)
//       })
//       .catch(e => console.log(e))
    
//   })
//   .catch((e) => {
//     console.log(e)
//   })
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

