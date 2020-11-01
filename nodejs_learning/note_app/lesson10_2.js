console.log('lesson10_2.js') 

const name = 'Feng'
// this export the variable name, allow it to be accessed when loaded
// module.exports = name

// define a function 
const add = function (a,b){
    return a + b
}

// this export the the function 
module.exports = add

