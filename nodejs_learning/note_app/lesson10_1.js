// connected to the lesson10_2.js file
// However, lesson10_1.js cannnot access the variables in lesson10_2.js, even if it is loaded. They have seperate scopes.

// accessing name variable here 
// const name = require('./lesson10_2.js') 
// console.log(name)

// add can be replaced by any name, but add is more descriptive
const add = require('./lesson10_2.js') 

const sum = add(2,3)
console.log(sum)

// challenge 
// in app.js and notes.js