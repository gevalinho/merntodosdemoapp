// todos
// joi verification
// check if the user exist
// create a token with JWT
const express = require("express")
const joi = require("joi")
const { User } = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/", async (req, res) => {
    const schema = joi.object({
        email: joi.string().min(9).max(200).email().required(),
        password: joi.string().min(5).max(200).required()
    })

    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try{
        //check if the user exist
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("This user does not exit")

    //compare the password with password in the database using bcrypt
    const validatePassword = await bcrypt.compare(
        req.body.password, user.password
    )
        if (!validatePassword) return error.status(400).send("incorrect user name or password")
        const secreateKey = process.env.SECREATE_KEY
        const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, secreateKey)
        res.send(token)
        
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
    

})
module.exports = router