const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const createHash = require("../lib/hashing").createHash;

Router.post("/", (req, res, next) => {
  const { mobile, password } = req.body;

  if (!mobile) {
    return res
      .status(400)
      .json({ status: "ERROR", error: "No mobile provided" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: "ERROR", error: "No password provided" });
  }

  hashPasswordGet = createHash(password);
  console.log("GET", hashPasswordGet);

  User.getUser(mobile)
    .then(user => {
      if (!user) {
        return res.status(400).json({
          STATUS: "ERROR",
          error: "User not found."
        });
      }

      const { password } = user;

      if (hashPasswordGet === password) {
        return res.status(200).json({
          STATUS: "SUCCESS",
          data: user
        });
      } else {
        return res.status(400).json({
          STATUS: "ERROR",
          error: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ STATUS: "ERROR", error: error });
    });
});

module.exports = Router;
