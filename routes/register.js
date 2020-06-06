const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const Parking = require("../models/parking");
const createHash = require("../lib/hashing").createHash;
const status = require("../config/constants");

//Route to register user

Router.post("/user", (req, res) => {
  req.body.password = createHash(req.body.password);
  console.log(req.body);
  User.createUser(req.body)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.ERROR, error: err });
    });
});

//Route to register parking

Router.post("/parking", (req, res) => {
  req.body.password = createHash(req.body.password);
  const parking = req.body;
  Parking.addParking(parking)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.ERROR, error: err });
    });
});

module.exports = Router;
