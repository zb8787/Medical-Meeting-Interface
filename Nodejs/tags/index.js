const express = require('express'); // return a function 
const app = express(); //call the function, return an object of type app
app.use(express.json()); // return middle work
const Joi = require('joi'); // return a class

const courses = [
    { id: 1, name: 'symtoms'},
    { id: 2, name: 'pill in take'},
    { id: 3, name: 'sympton duration'},
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses' , (req, res) => {
    res.send(courses);
});

// /api/course/1
app.get('/api/courses/:id', (req,res) => {
    //res.send(req.params.id);  //req not res
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('invalid tag');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);  //req not res

});

app.post('/api/courses', (req,res) => {
    // a complex validation way
    //if (!req.body.name || req.body.name.length < 3){
    //    res.status(400).send('Name is required and should be long')
    //    return;
    //}
    //const schema = {name: Joi.string().min(3).required()};
    const schema = Joi.object({ name: Joi.string() .min(3) .required()});
    const validation = schema.validate(req.body);
    //const result = Joi.validate(req.body,schema);
    console.log(validation);

    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// ports; part of the environment
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`listening at port ${port}`));

app.put('/api/courses/:id',(req,res)=> {
    // look up the course
    // if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('the course with given id is not found');
        return;
    }
    // valid
    const result = validateCourse(req.body);
    // if invalid, return 404
    if (result.error) return res.status(400).send(validation.error.details[0].message);
  
    // update course
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({ name: Joi.string().min(3) .required()});
    return schema.validate(course);
    //const result = Joi.validate(req.body,schema);
}

app.delete('/api/courses/:id',(req,res)=> {
    // look up the courses
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with given id is not found');
    // delete course
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
