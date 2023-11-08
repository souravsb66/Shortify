const express = require("express");
const { nanoid } = require("nanoid");
const { UrlModel } = require("../models/url.model");
const { CheckExpiry } = require("../components/CheckExpiry");

const urlRouter = express.Router();

urlRouter.post("/", async (req, res) => {
  const { longURL, expires, custom, expirationTime } = req.body;

    try {
        if (longURL) {
            let shortId;
            if (custom) {
                shortId = custom;
            } else {
                shortId = nanoid(8);
            }

            const urlObj = {
                shortId,
                longURL,
                expires
            }

            if (expires) {
                const creationTime = Date().split(" ")[4].split(":").map(Number);
                urlObj.expirationTime = expirationTime;
                urlObj.creationTime = creationTime;
            }

            const newURL = new UrlModel(urlObj);

            await newURL.save();
            res.status(200).send({
                message: "Short URL generated successfully",
                shortURL: shortId,
            });
        } else {
            res.status(400).send({ error: "Original URL required" });
        }
    } catch (err) {
        res.status(404).send({ error: err.message });
  }
});

urlRouter.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

    try {
        const url = await UrlModel.findOne({ shortId });
        if (url) {

            if(url.expires) {
                const creationTime = url.creationTime;
                const currentTime = Date().split(" ")[4].split(":").map(Number);

                let diff = CheckExpiry(creationTime, currentTime);
                
                if(diff > (url.expirationTime * 60)) {
                    await UrlModel.findOneAndDelete({ shortId });
                    res.status(200).send({"message": "URL expired, generate new URL"})
                }
                else {
                    res.status(200).redirect(url.longURL);
                }
            }
            else {
                res.status(200).redirect(url.longURL);
            }
        } else {
            res.status(400).send({ error: "Invalid URL" });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
  }
});


module.exports = {
  urlRouter,
};
