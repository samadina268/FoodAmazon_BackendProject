const mongoose = require("mongoose")
const joi = require("joi")

const productSchema = new mongoose.Schema({
   "productname": String,
   "secondname": String,
   "rating": String,
   "review": String,
   "price": String,
   "btn": String,
   "newprice": String,
   "cartid": String,
   "btn1": String,
   "btn2": String,
}) 

// validate product coming into the db
function validateProduct(productInfo){
   const schema = joi.object({
     productname: joi.string().required(),
     secondname: joi.string().required(),
     rating: joi.string().required(),
     review: joi.string().required(),
     price: joi.string().required(),
     btn: joi.string().required(),
     newprice: joi.string().required(),
     cartid: joi.string().required(),
     btn1: joi.string().required(),
     btn2: joi.string().required()
   })
   return schema.validate(productInfo)
}

const product = mongoose.model("product", productSchema)

module.exports = {product, validateProduct}