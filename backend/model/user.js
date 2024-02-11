const mongooes = require("mongoose");

const userSchema = mongooes.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 30},
    email: {type: String, required: true, minlength: 3, maxlength: 200, unique: true},
    password: {type: String, required: true, minlength: 6, maxlength: 1020}
}) 

// create a clas to house the schema
const User = mongooes.model("User", userSchema)

exports.User = User;