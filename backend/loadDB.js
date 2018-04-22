const fs = require('fs')

let users = []

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let names = [
  {name: "Andrew", gender: 'male'},
  {name: "Anthony", gender: 'male'},
  {name: "Dylan", gender: 'male'},
  {name: "Gavin", gender: 'male'},
  {name: "Isaiah", gender: 'male'},
  {name: "Jeremy", gender: 'male'},
  {name: "Kai", gender: 'male'},
  {name: "Stephen", gender: 'male'},
  {name: "Abraham", gender: 'male'},
  {name: "Adrian", gender: 'male'},
  {name: "Albert", gender: 'male'},
  {name: "Brian", gender: 'male'},
  {name: "Charles", gender: 'male'},
  {name: "Christian", gender: 'male'},
  {name: "Elias", gender: 'male'},
  {name: "Eric", gender: 'male'},
  {name: "Hunter", gender: 'male'},
  {name: "Jaden", gender: 'male'},
  {name: "Jericho", gender: 'male'},
  {name: "Juan", gender: 'male'},
  {name: "Justin", gender: 'male'},
  {name: "Kayden", gender: 'male'},
  {name: "King", gender: 'male'},
  {name: "Luke", gender: 'male'},
  {name: "Matthew", gender: 'male'},
  {name: "Owen", gender: 'male'},
  {name: "Roy", gender: 'male'},
  {name: "Ryan", gender: 'male'},
  {name: "Sean", gender: 'male'},
  {name: "Sebastian", gender: 'male'},
  {name: "Vincent", gender: 'male'},
  {name: "Anna", gender: "female"},
  {name: "Chloe", gender: "female"},
  {name: "Danielle", gender: "female"},
  {name: "Isabel", gender: "female"},
  {name: "Jasmine", gender: "female"},
  {name: "Kimberly", gender: "female"},
  {name: "Mary", gender: "female"},
  {name: "Taylor", gender: "female"},
  {name: "Victoria", gender: "female"},
  {name: "Amanda", gender: "female"},
  {name: "Andrea", gender: "female"},
  {name: "Angelina", gender: "female"},
  {name: "Camille", gender: "female"},
  {name: "Christine", gender: "female"},
  {name: "Destiny", gender: "female"},
  {name: "Diana", gender: "female"},
  {name: "Grace", gender: "female"},
  {name: "Johanna", gender: "female"},
  {name: "Kiara", gender: "female"},
  {name: "Kyla", gender: "female"},
  {name: "Megan", gender: "female"},
  {name: "Mia", gender: "female"},
  {name: "Precious", gender: "female"},
  {name: "Princess", gender: "female"},
  {name: "Rochelle", gender: "female"},
  {name: "Sarah", gender: "female"},
  {name: "Sharon", gender: "female"},
  {name: "Trinity", gender: "female"},
  {name: "Chloe", gender: "female"},
  {name: "Faith", gender: "female"},
  {name: "Elizabeth", gender: "female"},
  {name: "Kiara", gender: "female"},
  {name: "Maria", gender: "female"},
  {name: "Aaliyah", gender: "female"},
  {name: "Alyssa", gender: "female"},
  {name: "Angela", gender: "female"},
  {name: "Hannah", gender: "female"},
  {name: "Michelle", gender: "female"},
  {name: "Brianna", gender: "female"},
  {name: "Kayla", gender: "female"},
  {name: "Abigail", gender: "female"},
  {name: "Ashley", gender: "female"},
  {name: "Grace", gender: "female"},
  {name: "Jasmine", gender: "female"},
]

let tags = [
  ["3D printing", "amateur radio", "scrapbook", "Amateur radio", "Acting", "Baton twirling", "Board games", "Book restoration", "Cabaret", "Calligraphy", "Candle making", "Computer programming", "Coffee roasting", "Cooking", "Coloring", "Cosplaying", "Couponing", "Creative writing", "Crocheting", "Cryptography", "Dance", "Digital arts", "Drama", "Drawing", "Do it yourself", "Electronics", "Embroidery", "Fashion", "Flower arranging", "Foreign language learning", "Gaming", "tabletop games", "role-playing games", "Gambling", "Genealogy", "Glassblowing", "Gunsmithing", "Homebrewing", "Ice skating", "Jewelry making", "Jigsaw puzzles", "Juggling"],
  ["Knapping", "Knitting", "Kabaddi", "Knife making", "Lacemaking", "Lapidary", "Leather crafting", "Lego building", "Lockpicking", "Machining", "Macrame", "Metalworking", "Magic", "Model building", "Listening to music", "Origami", "Painting", "Playing musical instruments", "Pet", "Poi", "Pottery", "Puzzles", "Quilting", "Reading", "Scrapbooking", "Sculpting", "Sewing", "Singing", "Sketching", "Soapmaking", "Sports", "Stand-up comedy", "Sudoku", "Table tennis", "Taxidermy", "Video gaming", "Watching movies", "Web surfing", "Whittling", "Wood carving", "Woodworking", "Worldbuilding"],
  ["Writing", "Yoga", "Yo-yoing", "Air sports", "Archery", "Astronomy", "Backpacking", "BASE jumping", "Baseball", "Basketball", "Beekeeping", "Bird watching", "Blacksmithing", "Board sports", "Bodybuilding", "Brazilian jiu-jitsu", "Community", "Cycling", "Dowsing", "Driving", "Fishing", "Flag Football", "Flying", "Flying disc", "Foraging", "Gardening", "Geocaching", "Ghost hunting", "Graffiti", "Handball", "Hiking", "Hooping", "Horseback riding", "Hunting", "Inline skating", "Jogging", "Kayaking", "Kite flying", "Kitesurfing", "LARPing", "Letterboxing", "Metal detecting"],
  ["Motor sports", "Mountain biking", "Mountaineering", "Mushroom hunting", "Mycology", "Netball", "Nordic skating", "Orienteering", "Paintball", "Parkour", "Photography", "Polo", "Rafting", "Rappelling", "Rock climbing", "Roller skating", "Rugby", "Running", "Sailing", "Sand art", "Scouting", "Scuba diving", "Sculling", "Rowing", "Shooting", "Shopping", "Skateboarding", "Skiing", "Skimboarding", "Skydiving", "Slacklining", "Snowboarding", "Stone skipping", "Surfing", "Swimming", "Taekwondo", "Tai chi", "Urban exploration", "Vacation", "Vehicle restoration", "Water sports"]
]


for(let i = 0; i < 100; i++){
  let name = names[getRandomInt(0, 74)]
  users.push({
    id: i,
    name: name.name,
    gender: name.gender,
    age: getRandomInt(16, 40),
    tags: [
      tags[0][getRandomInt(0, 41)],
      tags[1][getRandomInt(0, 41)],
      tags[2][getRandomInt(0, 41)],
      tags[3][getRandomInt(0, 41)],
    ]
  })
}

fs.writeFileSync('./users', JSON.stringify(users))
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