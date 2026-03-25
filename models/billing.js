const mongoose = require("mongoose")
const joi = require("joi")


const billingSchema = new mongoose.Schema({
    email: String,
    deliverTo: String,
    country: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    area: String,
    zipCode: String,
    phoneNumber: String,
    orderNote: String
})

// validate joi
function validateBilling(billingInfo){
    const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
      deliverTo: joi.string().required(),
      country: joi.string().required(),
      firstName: joi.string().min(3).max(15).required(),
      lastName: joi.string().min(3).max(15).required(),
      address: joi.string().required(),
      city: joi.string().required(),
      area: joi.string().required(),
      zipCode: joi.string().required(),
      phoneNumber: joi.string().required(),
      orderNote: joi.string(),
    })
     return schema.validate(billingInfo)
}


const user = mongoose.model("billingInfo", billingSchema)

module.exports = {user, validateBilling}
