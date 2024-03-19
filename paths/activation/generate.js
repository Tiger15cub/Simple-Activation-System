const express = require("express");
const app = express();
const uuidV4 = require("uuid").v4;
const mongoose = require("mongoose");
const keys = require("../../db/keys.js");
const accounts = require("../../db/accounts.js");

mongoose.set('strictQuery', true);

app.get("/activation/generate/:auth", async (req, res) => {
  try {
    let auth = req.params.auth;
    let user = await accounts.findOne({ password: auth });
    if (user.admin == false) return res.json({ type: "error", error: "You are not an admin!" });
    let key = uuidV4();
    await keys.create({ key: key, activated: "no", blocked: "no", created: new Date().toISOString(), updated: new Date().toISOString() });
    return res.json({ "key": key })
  }catch(e){
    return res.json({ type: "error", error: "An error occured!" })
  }
});

module.exports = app;