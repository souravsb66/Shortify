const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    longURL: {
        type: String,
        required: true,
    },
    expires: { 
        type: Boolean, 
        required: true 
    },
    expirationTime: {
        type: Number,
        default: 0
    },
    creationTime: {type: [{ type: Number }]},
});

const UrlModel = mongoose.model("url", urlSchema);

module.exports = {
  UrlModel,
};
