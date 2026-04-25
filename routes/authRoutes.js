const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hash
  ]);

  res.json({ msg: "Registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!users.length) return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, users[0].password);

  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;