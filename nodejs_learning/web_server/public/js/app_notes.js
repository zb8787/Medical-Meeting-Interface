// client side java script
console.log('Client side java script loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
//     // the data needs to be parsed before read in 
//     response.json().then((data) => {
//         if (!data.error){
//             console.log(data.location)
//             console.log(data.forecast)
//         } else{
//             console.log("An error has occured: " + data.error)
//         }        
//     })
// })

// we want to select form and grab it by name
// we can mantipulate form 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// event listener 
weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    const location = search.value
    // you don't need the if, else. You can directly copy and paste
    if (location){
        fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        // the data needs to be parsed before read in 
            response.json().then((data) => {
                if (!data.error){
                    console.log(data.address)
                    console.log(data.forecast)
                } else{
                    console.log("An error has occured: " + data.error)
                }        
            })
        })
    } else{
        console.log("You must provide an address ")
    }
})