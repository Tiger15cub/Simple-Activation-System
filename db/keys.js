const mongoose = require("mongoose");

const keys = new mongoose.Schema(
    {
        created: { type: Date, required: true },
        updated: { type: Date, required: true },
        key: { type: String, required: true },
        activated: { type: String, required: true },
        blocked: { type: String, required: true}
    },
    {
        collection: "keys"
    }
)

const model = mongoose.model('keys', keys);

module.exports = model;