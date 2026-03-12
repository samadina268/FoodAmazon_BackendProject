const express = require("express")
const router = express.Router()
const {user, validateUser} = require("../../models/user")
const bcrypt = require("bcrypt")

router.post("/register", async (req,res) => {
    // validate the body
    const {error} = validateUser(req.body)
    if (error){
        return res.status(400).json(error.details[0].message)
    }

    // validate if user exist

    const checkUser = await user.findOne({email: req.body.email})
    if (checkUser){
        return res.status(400).json("user already exist")
    }

    // hass password

    const salt = await bcrypt.genSalt()
    const newUser = new user({
        fullname: req.body.fullname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password
    })

    newUser.password = await bcrypt.hash(newUser.password, salt)
    const dbUser = await newUser.save()

    res.json({
        id: dbUser._id,
        fullname: dbUser.email,
        email: dbUser.email
    })
})

module.exports = router