const express = require("express");
const router = express.Router();
const { product, validateProduct } = require("../../models/product");

// to post product
router.post("/product", async (req, res) => {
  // validate the body
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const newProduct = new product({
      id: req.body.id,
      image: req.body.image,
      productName: req.body.productName,
      secondName: req.body.secondName,
      rating: req.body.rating,
      review: req.body.review,
      price: req.body.price,
      btn: req.body.btn,
      newPrice: req.body.newPrice,
      cartId: req.body.cartId,
      btn1: req.body.btn1,
      btn2: req.body.btn2,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({
        message: "product add successfully !!",
        product: {
          id: savedProduct._id,
          id: savedProduct.id,
          productName: savedProduct.productName,
          cartId: savedProduct.cartId,
          newPrice: savedProduct.newPrice,
          rating: savedProduct.rating,
        },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/product", async (req, res) => {
  try {
    const products = await product.find();

    if (!products || products.length === 0) {
      return res.status(404).json("message: No products found in product DB");
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
