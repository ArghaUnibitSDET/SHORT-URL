
require ("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const{restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')

require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const URL = require("./models/url");
const app = express();
const PORT = process.env.PORT || 3000; 
const HOST = '192.168.1.38';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.locals.HOST = HOST;
app.locals.PORT = PORT;

app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
});

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: { visitHistory: { timestamp: Date.now() } },
        },
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, HOST, () => { 
    console.log(`Server running at http://${HOST}:${PORT}/`);
});