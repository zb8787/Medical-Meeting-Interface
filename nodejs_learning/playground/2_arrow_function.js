// recreate arrow function 
// const square = function (x){
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(4))

// this is a reference to event itself
// arrow function don't bind to this 
// method on objects 
const event = {
    name: 'Birthday Party',
    guestList: ['Andrew','Sam','Helen'],
    printGuestList(){
        // this => access the values in its created 
        console.log('Guest list for ' +  this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attening ' + this.name)
        })
    }
}

event.printGuestList()