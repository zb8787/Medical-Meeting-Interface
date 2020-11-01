const fs = require('fs')

const book = {
    title: 'Ego is the Enermy',
    author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify (book)
console.log(bookJSON)
// a string, not a object 
const parseData = JSON.parse(bookJSON)
console.log(parseData.author)
// parseData is an object 

fs.writeFileSync('1_json.json',bookJSON)
