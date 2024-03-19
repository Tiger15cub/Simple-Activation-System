const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("../../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/check/:key", async (req, res) => {
    let actKey = req.params.key;
    
    try{
        let keyFound = false;

        let key = await keys.findOne({ key : actKey })
        if ( key ) keyFound = true;

        if (keyFound == true) return res.json({ "type": "valid", "active": key.activated, "blocked": key.blocked });

        return res.json({ "type": "Error" })
    }catch(e){
        return res.json({ "type": "Error" })
    }
});

module.exports = app;