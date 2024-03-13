const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/block/:key", async (req, res) => {
    let actKey = req.params.key;
    try{
        let keyFound = false;
        let keyBlocked = false;

        const key = await keys.findOne({ key : actKey })
        if ( key ) keyFound = true;
        
        const isKeyBlocked = key.blocked;
        if( isKeyBlocked == "yes" ) keyBlocked = true;

        if (keyFound == true) 
        {
            if (keyBlocked == false)
            {
                await key.updateOne({ $set: { blocked: "yes", updated: new Date().toISOString() } });
                return res.json({ "type": "Success"})
            }
        }

        return res.json({ "type": "Error" })
    }catch(e){
        return res.json({ "type": "Error" })
    }
});

module.exports = app;