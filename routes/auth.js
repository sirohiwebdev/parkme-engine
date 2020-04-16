const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const Parking = require("../models/parking");
const createHash = require("../lib/hashing").createHash;

Router.post("/user", (req, res, next) => {
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
  // console.log("GET", hashPasswordGet);

  User.getUser(mobile)
    .then(user => {
      if (!user) {
        return res.status(402).json({
          status: "ERROR",
          error: "User not found."
        });
      }

      const { password } = user;

      if (hashPasswordGet === password) {
        return res.status(200).json({
          status: "SUCCESS",
          data: user
        });
      } else {
        return res.status(402).json({
          status: "ERROR",
          error: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ status: "ERROR", error: error });
    });
});

Router.post("/parking", (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile) {
    res.status(400).json({ status: "ERROR", error: "Mobile not found" });
  }
  if (!password) {
    res.status(400).json({ status: "ERROR", error: "Mobile not found" });
  }

  hashPasswordGet = createHash(password);

  Parking.getParking(null, mobile)
    .then(parking => {
      if (!parking) {
        return res.status(402).json({
          status: "ERROR",
          error: "User not found."
        });
      }

      const { password } = parking;

      if (hashPasswordGet === password) {
        return res.status(200).json({
          status: "SUCCESS",
          data: parking
        });
      } else {
        return res.status(402).json({
          status: "ERROR",
          error: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(402).json({ status: "ERROR", error: error });
    });
});

module.exports = Router;
