const User = require("../models/user");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const user = new User({name, email, password});
    await user.save();
    return res.render("/");
    //return res.status(201).json({ message: "User created successfully" });//sdfsdfdsfsddsf
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if (!user) {
        return res.render("login", {
            errorMessage: "Invalid credentials"
        });
        //return res.status(401).json({ error: "Invalid credentials" });
    }
    
    return res.render("/");
    //return res.status(201).json({ message: "User created successfully" });
}
module.exports = {handleUserSignup, handleUserLogin};