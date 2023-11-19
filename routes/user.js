const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ message: "Tu possède déjà un compte 🚀" });
    } else {
      if (req.body.email && req.query.password && req.query.username) {
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.body.password + salt).toString(encBase64);

        const newUser = new User({
          email: req.body.email,
          token: token,
          salt: salt,
          hash: hash,
          username: req.body.username,
        });
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
        });
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (
        SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
      ) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          username: user.username,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
