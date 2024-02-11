// create a function
// check if a token exist
// verify token
// pass it to the next()

const jwt = require("jsonwebtoken")

function auth(req, res, next){
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Your not authoried")

    try{
        const secreatkey = process.env.SECREATE_KEY
        const payload =  jwt.verify(token, secreatkey)
        req.user = payload
        next()

    }catch(error){
        res.status(400).send("Invalide token")
    }
}

module.exports = auth