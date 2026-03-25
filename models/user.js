const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
  },
  phonenumber: String,
  password: {
    type: String,
    maxlength: 1024,
  },
});

userSchema.methods.tokenGeneration = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.USER_JWTKEY,
    {expiresIn: "1d"}
  );
  return token;
};

function validateUser(userData) {
  const schema = joi.object({
    fullname: joi.string().min(6).max(30).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phonenumber: joi.string().min(8).max(15).required(),
    password: joi.string().min(7).max(15).required(),
  });

  return schema.validate(userData);
}

const collectionName =
  process.env.NODE_ENV === "production"
    ? "users_production"
    : "user_development";

const user = mongoose.model("User", userSchema, collectionName);

module.exports = { user, validateUser };
