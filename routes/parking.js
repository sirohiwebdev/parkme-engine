const express = require("express");
const Router = express.Router();
const status = require("../config/constants");
const Parking = require("../models/parking");

Router.get("/:id?", (req, res) => {
  Parking.getParking(req.params.id)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      console.log(err);
      res.json({ status: status.ERROR, error: err });
    });
});

Router.post("/", (req, res) => {
  const parking = req.body;
  Parking.addParking(parking)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.SUCCESS, error: err });
    });
});

module.exports = Router;
