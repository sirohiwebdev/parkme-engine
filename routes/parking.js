const express = require("express");
const Router = express.Router();
const status = require("../config/constants");
const Parking = require("../models/parking");
const createHash = require("../lib/hashing").createHash;

Router.get("/:id?", (req, res) => {
  const { location } = req.body;
  if (location) {
    Parking.getParkingByLocation(location)
      .then(parking => {
        res.json({ status: status.SUCCESS, data: parking });
      })
      .catch(err => {
        console.log(err);
        res.json({ status: status.ERROR, error: err });
      });
  } else {
    Parking.getParking(req.params.id)
      .then(parking => {
        res.json({ status: status.SUCCESS, data: parking });
      })
      .catch(err => {
        console.log(err);
        res.json({ status: status.ERROR, error: err });
      });
  }
});

Router.post("/", (req, res) => {
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

Router.put("/", (req, res) => {
  if (req.body.password) {
    req.body.password = createHash(req.body.password);
  }
  const parking = req.body;
  Parking.updateParking(parking._id, parking)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.ERROR, error: err });
    });
});

module.exports = Router;
