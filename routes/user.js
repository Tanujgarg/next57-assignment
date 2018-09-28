const express = require("express")
const router = express.Router()
const { User } = require("../models/users");


// GET all the user exists in the database
router.get("/", async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
})

// GET the user by user Id or ObjectId
router.get("/:id", async (req, res) => {
    User.findById(req.params.id, {auth: 0}, (err, user) => {
        if(err) return res.status(404).send("User not found")
        else if (!user) return res.status(404).send("not found")
        else return res.status(200).send(user);
    });
    
})

// POST Login of a user
router.post("/login", async (req, res) => {
    const user = await User.findOne({"auth.username":req.body.username}, {auth:1})
    if (user){
        if (user.auth.password === req.body.password) return res.send("login success")
        else return res.status(403).send("Invalid credentials")
    }
    else return res.status(403).send("Invalid credentials")
})

// POST create or add a new user to the database
router.post("/", async (req, res) => {
    var user = new User(req.body);
    console.log(JSON.stringify(user));

    try{
        user = await user.save();
        return res.send({
            status: true,
            email: user.contact.email.primary,
            username: user.auth.password
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send(err);
    }
})

// PUT update existing user
router.put("/:id", async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if(err) return res.status(400).send("Something went wrong")
        else return res.send("updated");
    })
})


// DELETE existing user
router.delete("/:id", async (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) return res.status(400).send("Something went wrong")
        else return res.send("deleted");
    })
})


exports.authentication = router;