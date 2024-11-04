const express = require ("express");
const path = require ("path");
require("./connect");
const urlRoute = require("./routes/url")
const statusRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);
app.use("/", statusRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));




app.get('/',(req, res) => {
    res.send('Welcome to the URL Shortener API');
})


app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls,
        
    })    
   });
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }, );
    
    res.redirect(entry.redirectURL);
});
// app.get("/:shortId", async (req, res) => {
//     const { shortId } = req.params;
//     const entry = await URL.findOneAndUpdate(
//         { shortId },
//         {
//             $push: { 
//                 visitHistory: {
//                     timestamp: Date.now(),
//                 },
//             },
//         },
//         { new: true } // This option ensures the updated document is returned
//     );

//     if (!entry) {
//         return res.status(404).send("URL not found");
//     }

//     res.redirect(entry.redirectURL);
// });



app.listen(PORT,() => console.log(`Server Started at PORT:${PORT}`));