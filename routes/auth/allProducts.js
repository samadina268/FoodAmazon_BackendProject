const express = require("express")
const router = express.Router()
const {product, validateProduct} = require("../../models/product")


// const ourProducts = [
//   {
//     id: 1,
//     image: product1,
//     productName: "Organic Almond Delight",
//     secondName: "Coconut Flakes",
//     rating: "5.0",
//     review: 18,
//     price: 110,
//     btn: "Add to Cart",
//     newPrice: 60,
//     cartId: 12345678910,
//     btn1: "Edit",
//     btn2: "Remove",
//   },
//   {
//     id: 2,
//     image: product2,
//     productName: "Berry Bliss Bites",
//     secondName: "Coconut Flakes",
//     rating: "5.0",
//     review: 28,
//     price: 139,
//     btn: "Add to Cart",
//     newPrice: 80,
//     cartId: 12345678911,
//     btn1: "Edit",
//     btn2: "Remove",
//   },
//   {
//     id: 3,
//     image: product3,
//     productName: "Coconut Crunchies",
//     secondName: "Coconut Flakes",
//     rating: "5.0",
//     review: 102,
//     price: 399,
//     btn: "Add to Cart",
//     newPrice: 290,
//     cartId: 12345678912,
//     btn1: "Edit",
//     btn2: "Remove",
//   },
// ];

// to post product 
router.post("/product", async (req,res) => {
    // validate the body
    const {error} = validateProduct(req.body)
    if(error){
        return res.status(400).json(error.details[0].message)
    }

    const newProduct = new product({
       image: req.body.image,
       productname: req.body.productname,
       secondname: req.body.secondname,
       rating: req.body.rating,
       review: req.body.review,
       price: req.body.price,
       btn: req.body.price,
       newprice: req.body.price,
       cartid: req.body.cartid,
       btn1: req.body.btn1,
       btn2: req.body.btn2
    })
    const savedProduct = await newProduct.save()
    res.status(200).json({message: "product add successfully !!", product: savedProduct})
    

})

router.get("/product", async (req,res) => {
    try{
    const products = await product.find()
    res.status(200).json(products)
    } catch(error){
        res.status(500).json({message: error.message})
    }

})

module.exports = router