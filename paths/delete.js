const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/delete/:key", async (req, res) => {
    let actKey = req.params.key;
    
    try{
        let keyFound = false;

        let key = await keys.findOne({ key : actKey })
        if ( key ) keyFound = true;
        if ( key.blocked == "yes" ) return res.json({"type": "Error", "error": "Your key is blocked!"})

        if (keyFound == true)
        {
            await key.delete();
            return res.json({ "type": "success"})
        }

        return res.json({ "type": "Error" })
    }catch(e){
        return res.json({ "type": "Error" })
    }
});

module.exports = app;