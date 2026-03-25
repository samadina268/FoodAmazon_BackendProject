const express = require("express");
const router = express.Router();
const { user, validateBilling } = require("../../models/billing");

router.post("/billinginfo", async (req, res) => {
  try {
    const { error } = validateBilling(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const newBillingInfo = new user({
      email: req.body.email,
      deliverTo: req.body.deliverTo,
      country: req.body.country,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      area: req.body.area,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
      orderNote: req.body.orderNote,
    });

    const savedBillingInfo = await newBillingInfo.save();
    res.status(201).json({
      message: "Billing info recieved successfully",
      billingInfo: {
        _id: savedBillingInfo._id,
        email: savedBillingInfo.email,
        firstName: savedBillingInfo.firstName,
        lastName: savedBillingInfo.lastName,
        address: savedBillingInfo.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
