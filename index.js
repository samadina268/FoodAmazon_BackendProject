const express = require("express");
const app = express();
const mongoose = require("mongoose");
const register = require("./routes/auth/register");
const signin = require("./routes/auth/signIn");
const product = require("./routes/auth/allProducts");
const bulkProduct = require("./routes/auth/bulkProduct");
const billingInfo = require("./routes/auth/billingInfo")
const subNewsletter = require("./routes/auth/subNewsletter")
const cors = require("cors");
const db = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use("/home", register);
app.use("/home", signin);
app.use("/home", product);
app.use("/home", bulkProduct);
app.use("/checkout", billingInfo)
app.use("/home", subNewsletter)

app.get("/", (req, res) => {
  res.send("connected to Food Amazon DB");
});

mongoose
  .connect(`${db}`)
  .then(() => console.log("connected to mongoose db ..."))
  .catch((err) => console.log("mongodb connection error", err));
console.log("process:", process.env.NODE_ENV);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
