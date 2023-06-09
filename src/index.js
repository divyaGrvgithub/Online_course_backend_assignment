const express = require("express")
const bodyParser = require('body-parser')
const router = require("./router/route")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(bodyParser.json());

mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://divyamala_:Dt25042000knp@divyamala.0cofsch.mongodb.net/onlineBackend", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is Connected"))
    .catch((err => console.log(err)))
  
app.use("/", router)

app.listen(process.env.Port || 3000, () => {
    console.log("Express App Running On Port", +(process.env.Port || 3000))
})