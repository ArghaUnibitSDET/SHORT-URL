const mongoose = require("mongoose");

const conn =  mongoose.createConnection(process.env.MONGODB_URL);
//const conn = mongoose.createConnection("mongodb://localhost:27017");


if (conn) {
    console.log("Connected to MongoDB");
}
module.exports = conn;