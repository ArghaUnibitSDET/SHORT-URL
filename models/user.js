const mongoose = require('mongoose');
const conn = require('../connect');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        //unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps:true});

const User = conn.model("user", userSchema);
module.exports = User;