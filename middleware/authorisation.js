const jwt = require("jsonwebtoken");
const config = require("config");
const {user} = require("../models/user")

async function authorize(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json("token required");
  }
  try {
    // verify token
    const verify = jwt.verify(token, config.get("jwtsecretkey"));

    // verify user
    const verifyUser = await user.findById(verify._id)
    if(!verifyUser){
      return res.status(401).json("user not found")
    }

    req.user = verifyUser;
    next();
  } catch (err) {
    return res.status(400).json("invalid token");
  }
}

module.exports = authorize;
