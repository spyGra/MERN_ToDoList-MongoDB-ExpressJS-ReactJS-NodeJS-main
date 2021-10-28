const mongoose = require("mongoose")

const taskSchema = {
    task: String,
    complete: Boolean
}

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;