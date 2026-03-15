const express = require("express")
const app = express()
const mongoose = require("mongoose")
const register = require("./routes/auth/register")
const signin = require("./routes/auth/signIn")
const config = require("config")
const db = process.env.DB_URL

app.use(express.json())
app.use("/home", register)
app.use("/home", signin)


mongoose.connect(db)
.then(() => console.log("connected to mongoose db ..."))
.catch(err => console.log("mongodb connection error", err))
console.log("process:", process.env.NODE_ENV)
console.log("db", db)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`))