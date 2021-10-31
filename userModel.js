const mongoose = require("mongoose")

const userSchema = {
    userName: String,
    userPassword: String
}

const User = mongoose.model("USER", userSchema)

module.exports = User;