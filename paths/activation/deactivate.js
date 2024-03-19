const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("../../db/keys.js");

mongoose.set('strictQuery', true);

app.get("/activation/deactivate/:key", async (req, res) =>{
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
            if (keyActivated == true)
            {
                await key.updateOne({ $set: { activated: "no", updated: new Date().toISOString() } });
                return res.json({ "type": "Success"})
            }
        }

        return res.json({ "type": "Error" })
    }catch(e){
        return res.json({ "type": "Error" })
    }
});

module.exports = app;