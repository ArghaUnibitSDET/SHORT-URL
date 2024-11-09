const mongoose = require("mongoose");
const conn = require('../connect');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,    
        },
        redirectURL: {
            type: String,
            required:true,
        },
        visitHistory: [{timestamp: {type:Number}}],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    {timestamps:true}
);

const URL = conn.model("URL", urlSchema);

module.exports=URL;