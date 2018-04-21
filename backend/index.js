const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()
const WebSocket = require('ws')
const fs = require('fs')

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

// const axios = require('axios')
// const cheerio = require('cheerio')

// axios('https://vkevent.ru/popular/')
//   .then(({data}) => {
//     let page = cheerio.load(data)
//     let links = []
//     page('.event_page_link').map((i, el) => {
//       links.push(`https://vkevent.ru${el.attribs.href}`)
//     })
    
//     let promises = links.map(link => axios(link))
//     Promise.all(promises)
//       .then((pages)=>{
//         let parsedEvents = pages.map(({data}, i) => {
//           let eventPage = cheerio.load(data)
//           return {
//             id: ++i,
//             eventName: eventPage('.event_link').text(),
//             description: eventPage('.event_description').text(),
//             link: eventPage('.site_link').text(),
//             date: + eventPage('.timestamp').text().slice(0, 10) * 1000,
//             place: eventPage('#map_latlng').text(),
//             image: eventPage('.event_image').attr('src'),
//             type: 'type of the event'
//           }
//         })
//         // console.log(parsedEvents)
//         fs.writeFileSync('./events.json', JSON.stringify(parsedEvents))
//       })
//       .catch(e => console.log(e))
    
//   })
//   .catch((e) => {
//     console.log(e)
//   })