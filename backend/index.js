const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { urlRouter } = require("./routes/url.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/url", urlRouter)

app.use("/", (req,res) => {
    res.status(200).send({"message": "Home page"});
})

app.listen(process.env.PORT, async (req, res)=> {
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`listening on PORT ${process.env.PORT}`);
    }
    catch(err) {
        console.log(err.message);
    }
})