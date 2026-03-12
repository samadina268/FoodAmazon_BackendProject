const jwt = require("jsonwebtoken")
const config = require("config")

function authorize(req,res,next){
    const token = req.header("x-auth-token")
    if(!token){
        return res.status(401).json("token required")
    }
    try{
         const verify = jwt.verify(token, config.get("jwtsecretkey"))
         req.confirmUser = verify
    }
    catch(err){
        res.status(400).json("invalid token")
    }
}

module.exports = authorize