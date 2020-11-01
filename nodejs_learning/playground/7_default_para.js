// dear is the default parameter 
const greeter = (name = "dear") => {
    console.log('Hello ' + name)
}

greeter("Feng")
greeter()