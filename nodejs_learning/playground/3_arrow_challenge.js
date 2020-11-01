//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

// what I wrote, I didn't use filter, extra lines 
const me = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo(){
        this.tasks.forEach((task)=>{
            if (task.completed === false){
                console.log(task.text)
            }            
        })
    }
}

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo(){
        return this.tasks.filter((task)=> task.completed === false )
    }
}

// since console.log is in the variable, no need to further specify 
console.log(tasks.getTasksToDo())