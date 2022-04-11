const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json());
require('dotenv').config()

// Replace your connection string given from mongodb into your application code like the example.
// Ensure any option params are URL encoded.
mongoose.connect(`mongodb://localhost/mernTest`)

// If you want to use AtlasDB put this url and change your data in .env file.
// mongoose.connect(`mongodb+srv://${process.env.SECRET_NAME}:${process.env.SECRET_PASSWORD}@${process.env.DATABASE_IP}/${process.env.SECRET_DATABASE_NAME}?retryWrites=true&w=majority`)

mongoose.connection.once('open',function (){
    console.log('Connection has been made')
}).on('error', function (error){
    console.log('Connection error.', error)
})

app.use("/", require("./routes"))

app.listen(3001, function (){
    console.log("express server is running on port 3001")
})




