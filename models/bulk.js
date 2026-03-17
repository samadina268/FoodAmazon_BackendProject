const mongoose = require("mongoose")
const joi = require("joi")

const bulkSchema = new mongoose.Schema({
  image: String,
  productname: String,
  aboutproduct: String,
  btn: String
})

function validatebulkproduct(data) {
    const schema = joi.object({
        image: joi.string().required(),
        productname: joi.string().required(),
        aboutproduct: joi.string().required(),
        btn: joi.string().required(),
    })
    return schema.validate(data)
}

const product = mongoose.model("bulkProduct" , bulkSchema)

module.exports = {product, validatebulkproduct}