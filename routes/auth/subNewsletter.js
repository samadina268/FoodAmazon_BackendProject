const express = require("express")
const { subnewsletter, validateNewletter } = require("../../models/subcribe")
const router = express.Router()

router.post("/subnewsletter", async (req,res) => {
   try{
    const {error} = validateNewletter(req.body)
   if(error){
    res.status(400).json(error.details[0].message)
   }  

   const checkemail = await subnewsletter.findOne({email: req.body.email})
   if(checkemail){
    res.status(400).json("email already subscribed")
   }

   const newEmail = new subnewsletter({
    email: req.body.email
   })

   const saveEmail = await newEmail.save()

   return res.status(201).json({
    message: "Email added successfully",
    email: saveEmail.email
   })

   }catch(error){
    return res.status(500).json({error: error.message})
   }
})

router.get("/subnewsletter", async (req,res) => {
    try{
        const subemail = await subnewsletter.find()
        if(!subemail || subemail.length === 0){
            return res.status(400).json("No subcribed email yet!!!")
        } return res.status(200).json(subemail)
    }catch(error){
        return res.status(500).json({error: error.message})
    }
})

module.exports = router