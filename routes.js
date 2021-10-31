const express = require("express");
const router = express.Router();
const Task = require("./model")
const User = require("./userModel")


// user routes

router.route("/adduser").post((req, res)=>{
    const inputUser = req.body;
    const newUser = new User({
        userName: inputUser.userName,
        userPassword: inputUser.userPassword
    })
    newUser.save().then(foundUser=>res.json(foundUser))
})

router.route("/login/:userName/:userPassword").get((req, res)=>{
    const userName = req.params.userName;
    const userPassword = req.params.userPassword;
    User.find({userName: userName, userPassword: userPassword})
        .then(foundData=> res.json(foundData))
})

// task routes

router.route("/findone/:title").get((req, res)=>{
    const id = req.params.title;
    Task.find({_id: id})
        .then(foundData=> res.json(foundData))
})

router.route("/addtask").post((req, res)=>{
    const task = req.body.task;
    const newTask = new Task({
        task:task,
        complete: true
    })
    newTask.save().then(foundData=> res.json(foundData))
})

router.route("/alltasks/:pagenumber/:pagelength").get((req, res)=>{
    const pageNumber = req.params.pagenumber
    const pageLength = req.params.pagelength
    const startIndex = (pageNumber - 1) * pageLength
    const endIndex = pageNumber * pageLength
    Task.find()
        .then(foundData=> res.json(foundData.slice(startIndex, endIndex)))
})

router.route("/alltasks").get((req, res)=>{
    Task.find()
        .then(foundData=> res.json(foundData))
})

router.route("/delete/:title").delete((req, res)=>{
    const id = req.params.title;
    Task.findByIdAndDelete(id)
        .then(foundData=> res.json(foundData))
        .catch(err=>console.log(err))
})

router.route("/deletemany/:title").delete((req, res)=>{
    const id = req.params.title;
    Task.deleteMany({
        _id:{$in:id.split(',')}
    })
        .then(foundData=> res.json(foundData))
        .catch(err=>console.log(err))
})

router.route("/update/:title").put((req, res)=>{
    const task = req.body.task;
    const id = req.params.title;
    Task.updateOne({ _id: id }, { $set: { task: task } })
        .then(foundData=> res.json(foundData))
        .catch(err=>console.log(err))
})

router.route("/updatecomplete/:title").put((req, res)=>{
    const complete = req.body.complete;
    const id = req.params.title;
    Task.updateOne({ _id: id }, { $set: { complete: complete } })
        .then(foundData=> res.json(foundData))
        .catch(err=>console.log(err))
})

module.exports = router;