// validate with joi
// check if user exit
// create new user
// hash password = > bcrypt
// save user


const express = require ("express");
const joi = require ("joi")
const { User } = require ("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const router = express.Router()

router.post("/", async (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().min(9).max(200).email().required() ,
        password: joi.string().min(6).max(200).required()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    try{
        let user = await User.findOne({email: req.body.email})
        if (user)
            return res.status(400).send("User with this email already exist...")

            const { name, email, password } = req.body
            user = new User(
                { name, email, password }
            )

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
            await user.save()
            
            const secreateKey = process.env.SECREATE_KEY
        const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, secreateKey)
        res.send(token)

            res.send("User Created")

    }catch(error){res.status(500).send(error.message)
        console.log(error.message)
    }


    
})

module.exports = router