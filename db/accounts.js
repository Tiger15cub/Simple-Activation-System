const mongoose = require("mongoose");

const accounts = new mongoose.Schema(
  {
    created: { type: Date, required: true },
    updated: { type: Date, required: true },
    accountId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    banned: { type: Boolean, required: true },
    admin: { type: Boolean, required: true }
  },
  {
    collection: "accounts",
  },
);

const model = mongoose.model("accounts", accounts);

module.exports = model;
