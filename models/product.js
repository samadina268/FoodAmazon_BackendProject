const mongoose = require("mongoose")
const joi = require("joi")

const productSchema = new mongoose.Schema({
   "image": String,
   "productname": String,
   "secondname": String,
   "rating": String,
   "review": String,
   "price": String,
   "btn": String,
   "newPrice": String,
   "cartId": String,
   "btn1": String,
   "btn2": String,
}) 

const product = mongoose.model("product", productSchema)

module.expoerts = product