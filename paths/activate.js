const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/activate/:key", async (req, res) => {
    let actKey = req.params.key;
    
    try{
        let keyFound = false;
        let keyActivated = false;

        const key = await keys.findOne({ key : actKey })
        if ( key ) keyFound = true;
        
        const isKeyActivated = key.activated;
        if( isKeyActivated == "yes" ) keyActivated = true;
        if( key.blocked == "yes" ) return res.json({"type": "error", "error": "Your key is blocked!"})

        if (keyFound == true) 
        {
            if (keyActivated == false)
            {
                await key.updateOne({ $set: { activated: "yes", updated: new Date().toISOString() } });
                return res.json({ "type": "valid"})
            }
        }
        return res.json({ "type": "invalid" })
    }catch(e){
        return res.json({ "type": "invalid" })
    }
});

module.exports = app;