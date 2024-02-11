// import express js
const express = require("express")
// initializing the xppress application
const todos = require("./routes/todos")
const signUp = require("./routes/signUp")
const signIn = require("./routes/signIn")
const auth = require("./middleware/auth")
const app = express()
//importing mongoose
const mongoose = require("mongoose")
const {Todo} = require("./model/todo")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use("/api/todos", todos)
app.use("/api/signUp", signUp)
app.use("/api/signIn", signIn)

require("dotenv").config()

//executing request and response 
app.get("/", (req, res) =>{

    
res.send() 

})

console.log(Todo)

//getting connection from mongodb datatbase through the .env
const connection_string = process.env.CONNECTION_STRING

app.listen(5000, () =>{

    console.log("Running server on port 5000")
})

// connecting to the server
mongoose.connect(connection_string, {
// adding options to reduce duplication errors
    // useNewUrlParser: true,
    //useCreateIndex: true,
   // useUnifiedTopology: true

})
.then(() => console.log("Connected to database"))
.catch((error) => console.error("database connection failed", error.massage))