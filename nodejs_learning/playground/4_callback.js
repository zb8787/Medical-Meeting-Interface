// be able to do the same thing for mulitiple times without copying code 
// be able to order how you want to do things 
// make the code more readable
// avoid deeply nested 

// call back function: a function provide as an argument to another function 
// call back function != asynchronous
setTimeout(()=>{
    console.log('2 second timer')
}, 2000)

// norhing asynchronous about the filter 
const names = ['Andrew', 'Jen', 'Jess']
const shortName = names.filter((name) => {
    return name.length <= 4
})
console.log(shortName)

// no return statement directly inside geocode 
// to get the asynchronous portion working, we need to use callback function 
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longtitude: 0 
        }
        callback(data)
    },2000)
}

const data = geocode("dsda",(data) =>{
    console.log(data)
})

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!


const add = (num1, num2, callback) => {
    setTimeout(() => {
        const summation = num1 + num2
        callback(summation)
    },3000)
}

add(4,1, (summation) => {
    console.log(summation)
})