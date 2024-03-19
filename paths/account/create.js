const express = require("express");
const app = express();
const accounts = require("../../db/accounts.js");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");


app.post("/api/account/create", async (req, res) => {
  const username = req.headers.username;
  const email = req.headers.email;
  const password = req.headers.password;

  if (await accounts.findOne({ username: username }))
    return res.json({ type: "error", error: "Username already exists!" });
  if (await accounts.findOne({ email: email }))
    return res.json({ type: "error", error: "Email already in use!" });

  const accountId = uuid();

  const hash = await bcrypt.hash(password, 10);
  
  await accounts.create({
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    accountId,
    username,
    email,
    password: hash,
    banned: false,
    admin: false,
  });

  res.json({ type: "success", Token: hash });
});

module.exports = app;
