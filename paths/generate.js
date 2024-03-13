const express = require("express");
const app = express();
const uuidV4 = require("uuid").v4;
const mongoose = require("mongoose");
const keys = require("../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/generate", async (req, res) => {
    let key = uuidV4();
    await keys.create({ key: key, activated: "no", blocked: "no", created: new Date().toISOString(), updated: new Date().toISOString() });
    return res.json({ "key": key })
});

module.exports = app;