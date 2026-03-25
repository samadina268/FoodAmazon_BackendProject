const express = require("express");
const router = express.Router();
const { user, validateUser } = require("../../models/user");
const authorize = require("../../middleware/authorisation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

router.post("/signin", async (req, res) => {
  try {
    // validate error
    const Schema = joi.object({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi.string().min(7).max(15).required(),
    });

    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // check if email exist
    const checkUser = await user.findOne({ email: req.body.email });
    if (!checkUser) {
      return res.status(400).json("invalid email or password");
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(400).json("invalid email or password");
    }

    // create tokenGeneration
    const tokenGeneration = checkUser.tokenGeneration();
    return res
      .status(200)
      .json({ message: "login successfully", token: tokenGeneration });
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
});

module.exports = router;
