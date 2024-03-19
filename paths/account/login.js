const express = require("express");
const app = express();
const accounts = require("../../db/accounts.js");
const bcrypt = require("bcrypt");

app.post("/api/account/login", async (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;

  if (!await accounts.findOne({ email: email }))
    return res.json({ type: "error", error: "Account not found!" });

  const account = await accounts.findOne({ email: email })

  const isLoggedin = await bcrypt.compare(password, account.password);

  if (isLoggedin) return res.json({ type: "success", "token": account.password })

  res.json({ type: "error", error: "Invalid password!" });
});

module.exports = app;
