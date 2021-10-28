const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json());
require('dotenv').config()

// Replace your connection string given from mongodb into your application code like the example.
// Ensure any option params are URL encoded.
mongoose.connect(`mongodb+srv://${process.env.SECRET_NAME}:${process.env.SECRET_PASSWORD}@express.6yjdu.mongodb.net/${process.env.SECRET_DATABASE_NAME}?retryWrites=true&w=majority`)

app.use("/", require("./routes"))

app.listen(3001, function (){
    console.log("express server is running on port 3001")

})




