// user model
// signUp => Hash password => puplic
// singIn => JWT => public
// protect apis => middlware => authorization


const { Todo } = require("../model/todo")
const express = require("express")
const joi = require("joi")
// const auth = require("../middleware/auth") 

const router = express.Router()

router.patch("/:id", async(req, res) => {
    try{
    
    // getting the data we are updating by it's id
    const todo = await Todo.findById(req.params.id)

    // is the id or data does not exist we will notify the user 
    if(!todo) res.status(404).send("Todo was not found...");

    

        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, {
        isComplete: !todo.isComplete
    })

        res.send(updateTodo)

    // res.status(500).send(error.message)
    // console.log(error.message)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
    

})

router.put("/:id", async(req, res) => {
    // we have to perform validation to the data that will be inputed
    const schema = joi.object({
        name : joi.string().min(3).max(200).required(),
        author : joi.string().min(3).max(30),
        uid : joi.string,
        isComplete : joi.boolean(),
        date : joi.date()
    }).options({abortEarly:false})

    // joi validation
    const { value, error } = schema.validate(req.body)
    console.log(value, error)

    //using the error checker to notify the user
    if(error) return res.status(400).send(error.details[0].message )
    // getting the data we are updating by it's id
    try{
        
        const todo = await Todo.findById(req.params.id)

    // is the id or data does not exist we will notify the user 
    if(!todo) res.status(404).send("Todo was not found...");

    // getting the values from the endpoint body
    const { name, 
        author, 
        isComplete, 
        date, 
        uid } =req.body;

    

        // awaiting a promise from the data id and creating a new object
        const updatedTodos = await Todo.findByIdAndUpdate(req.params.id, {

            // request body
            name, 
            author, 
            isComplete, 
            date, 
            uid
        }, { new: true})
    
        res.send(updatedTodos)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
   
   
})

router.delete("/:id", async(req, res) => {
// deleteOne()
// delteMany()
// findByIdAndDelte()

//const delteTodo = await Todo.deleteOne({isComplete: true})
//const deleteTodo = await Todo.deleteMany({isComplete: false})

// getting the data we are updating by it's id
const todo = await Todo.findById(req.params.id)

// is the id or data does not exist we will notify the user 
if(!todo) res.status(404).send("Todo was not found...");

try{
const deleteById = await Todo.findByIdAndDelete(req.params.id)
res.send(deleteById)

}catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
}

})

router.get("/", async( req, res ) => {

    try{

    const todos = await Todo.find()
   .sort({date: 1})
   res.send(todos)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)

    }
   

})

router.post("/", async( req, res ) => {

    const schema = joi.object({
        name : joi.string().min(3).max(200).required(),
        author : joi.string().min(3).max(30),
        uid : joi.string,
        isComplete : joi.boolean(),
        date : joi.date()
    }).options({abortEarly:false})

    // joi validation
    const { value, error } = schema.validate(req.body)
    console.log(value, error)

    if(error) return res.status(400).send(error.details[0].message )

    const { name, author, isComplete, date, uid } =req.body;
    let todo = new Todo({

        name, author, isComplete, date, uid
    })

    try {
         todo = await todo.save();
         res.send(todo);
    } catch (error) {
        res.status(500).send(); 
        console.log(error.message);
    }
 
});

module.exports = router
