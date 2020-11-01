console.log('Client side java script loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// we want to assign unique ID to 
const messageOne = document.querySelector('#message_0ne')
const messageTwo = document.querySelector('#message_Two')


// event listener 
weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    const location = search.value
    // initizlization
    messageOne.textContent = "loading..."
    messageTwo.textContent = ''
    // you don't need the if, else. You can directly copy and paste
    if (location){
        fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        // the data needs to be parsed before read in 
            response.json().then((data) => {
                if (!data.error){
                    messageOne.textContent = data.address
                    messageTwo.textContent = data.forecast
                } else{
                    messageOne.textContent = "An error has occured: " + data.error
                }        
            })
        })
    } else{
        messageOne.textContent = "You must provide an address "
    }
})