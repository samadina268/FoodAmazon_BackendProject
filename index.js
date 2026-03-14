const express = require("express")
const app = express()
const mongoose = require("mongoose")
const register = require("./routes/auth/register")
const signin = require("./routes/auth/signIn")
const config = require("config")
const db = config.get("DB")

app.use(express.json())
app.use("/home", register)
app.use("/home", signin)


mongoose.connect(db)
.then(result => console.log("connected to mongoose db ..."))
.catch(err => console.log("mongodb connection error", err))
console.log("process:", process.env.NODE_ENV)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`))