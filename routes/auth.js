const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const Parking = require("../models/parking");
const createHash = require("../lib/hashing").createHash;
const JWT = require("../jwt");
const mongoose = require("mongoose");

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

  //Get user with mobile and validate its password
  User.getUser({ mobile: mobile, password: hashPasswordGet })
    .then(user => {
      if (!user) {
        return res.status(402).json({
          status: "ERROR",
          error: "User not found."
        });
      }

      const token = JWT.createJWTAuth(user);
      const { password, ...restUserData } = user;

      return res.status(200).json({
        status: "SUCCESS",
        data: { ...restUserData, token }
      });
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
        const token = JWT.createJWTAuth(parking);

        const { password, ...restParkingDetails } = parking;

        return res.status(200).json({
          status: "SUCCESS",
          data: { ...restParkingDetails, token }
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
