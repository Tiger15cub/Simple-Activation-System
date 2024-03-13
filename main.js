const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json").toString());

const PORT = config.Internal_Server_Port;

mongoose.set('strictQuery', true);

fs.readdirSync("./paths").forEach(fileName => {
    app.use(require(`./paths/${fileName}`));
});

app.listen(PORT, () => {
    console.log(`Server is running`);
}).on("error", async (err) => {
    if (err.code == "EADDRINUSE") {
        console.log("Port in use!");
        process.exit(0);
    } else throw err;
});

mongoose.connect(config.MongoDB_URI, () => {
    console.log("App successfully connected to MongoDB!");
});

mongoose.connection.on("error", err => {
    console.log("MongoDB failed to connect, please make sure you have MongoDB installed and running.");
    throw err;
});

app.use((req, res, next) => {
    res.json({
        "Error": "Wrong Endpoint!"
    });
});