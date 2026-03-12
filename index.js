const express = require("express")
const app = express()
const mongoose = require("mongoose")
const register = require("./routes/auth/register")
const signin = require("./routes/auth/signIn")
const db = process.env.DB

app.use(express.json())
app.use("/home", register)
app.use("/home", signin)

if(!db){
    console.error("ERROR: DB environment variable not set")
    process.exit(1)
}

mongoose.connect(db)
.then(result => console.log("connected to mongoose db ...", (db)))
.catch(err => console.log("mongodb connection error", err))
console.log("process:", process.env.NODE_ENV)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`))