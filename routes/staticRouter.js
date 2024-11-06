const express = require("express");
const router = express.Router();
const URL = require("../models/url");


router.get("/", async (req, res) => {
    const allUrls = await URL.find({});
    
    // Define HOST and PORT based on your environment
    const PORT = 8002;
    const HOST = '192.168.1.38'; // set PORT directly or get from environment variables

    return res.render("home", { urls: allUrls, HOST, PORT });
});
module.exports = router;