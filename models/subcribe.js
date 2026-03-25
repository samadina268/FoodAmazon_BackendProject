const mongoose = require("mongoose")
const joi = require("joi")

const subNewsletter = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }
})

function validateNewletter(data){
    const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    })
    return schema.validate(data)
}


const subnewsletter = mongoose.model("subNewsletter", subNewsletter)

module.exports = {subnewsletter, validateNewletter}