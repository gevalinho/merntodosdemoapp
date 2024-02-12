const mongooes =  require("mongoose");

// using mongoose schema object
const todoShema = new mongooes.Schema({
    name:{ type: String, required: true, minlength: 4, maxlength: 200 },
    author: {type: String, minlength: 3, maxlength: 30},
    _id: String,
    isComplete: Boolean,
    date: {type: Date, default: new Date()}
})

// create a todo model to help us communicate with the dataBase

const Todo = mongooes.model('Todo', todoShema)
 exports.Todo = Todo;