const fs = require('fs')

let file = fs.readFileSync('./db.json')

file = JSON.parse(file)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

file.crowdEvents.map((ev) => {
  let max = getRandomInt(2, 5)
  ev.participants = []
  for(let i= 0; i<max; i++){
    ev.participants.push(getRandomInt(0,99))
  }
})

fs.writeFileSync('./db.json', JSON.stringify(file))

// console.log(file)