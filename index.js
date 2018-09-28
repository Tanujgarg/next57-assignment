const express = require("express")
const app = express()
const { authentication } = require("./routes/user")
const mongoose = require("mongoose")
require('dotenv').config()


mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@tanujgarg-cjfw4.mongodb.net/${process.env.DBNAME}?retryWrites=true`)
    .then(()=> console.log("Database connected"))
    .catch(err => console.log("Something went wrong with database", err))

app.use(express.json())
app.use("/user", authentication);
app.listen(process.env.PORT || 3000, ()=> console.log(`Server is running on port ${process.env.PORT || 3000}`))