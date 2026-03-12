const express = require("express")
const router = express.Router()
const {user, validateUser} = require("../../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const joi = require("joi")

router.post("/signin", async (req,res) => {
    // validate error
    const Schema = joi.object({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}}).required(),
            password: joi.string().min(7).max(15).required()
        })

    const {error} = Schema.validate(req.body)
    if(error){
       return res.status(400).json(error.details[0].message)
    }

    
    // check if email exist
    const checkUser = await user.findOne({email: req.body.email})
    if(!checkUser){
        return res.status(400).json("invalid email")
    }
    
    // check if password is correct
    const checkPassword = await bcrypt.compare(req.body.password , checkUser.password)
    if(!checkPassword){
        return res.status(400).json("invalid password")
    }
    
    // create token
    const tokenGeneration = checkUser.tokenGeneration()
     res.json({message: "login succesfully", token: tokenGeneration})

})

module.exports = router