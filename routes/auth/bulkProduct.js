const express = require("express")
const router = express.Router()
const {product, validatebulkproduct} = require("../../models/bulk")


router.post("/bulkproduct", async (req,res) =>{
    try{
        const {error} = validatebulkproduct(req.body)
    if(error){
        return res.status(400).json(error.details[0].message)
    }

    const newProduct = new product({
        image: req.body.image,
        cartid: req.body.id,
        productname: req.body.productname,
        aboutproduct: req.body.aboutproduct,
        btn: req.body.btn
    })

    const savedProduct = await newProduct.save()
    res.status(201).json({message: "product added sucessfully", product: {
        id: savedProduct._id,
        cartid: savedProduct.cartid,
        image: savedProduct.image,
        productname: savedProduct.productname,
        aboutproduct: savedProduct.aboutproduct
    }})
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

router.get("/bulkproduct", async (req,res) => {
    try{
        const products = await product.find()
    if (!products || products.length === 0){
        return res.status(400).json("message: no product available in the db")
    }
    res.status(200).json(products)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

module.exports = router
