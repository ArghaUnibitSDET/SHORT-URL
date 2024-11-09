const {v4:uuidv4} = require('uuid');
const User = require("../models/user");
const{setUser}= require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const user = new User({name, email, password});
    await user.save();
    return res.redirect("/");
    //return res.status(201).json({ message: "User created successfully" });
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if (!user) 
        return res.render("login", {
            errorMessage: "Invalid credentials"
        });
        //return res.status(401).json({ error: "Invalid credentials" });
    const sessionId= uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/");
    //return res.status(201).json({ message: "User logged in successfully" });
    
}
module.exports = {handleUserSignup, handleUserLogin};