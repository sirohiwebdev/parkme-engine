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

Router.post("/location", (req, res, next) => {
  const { location, radius } = req.body;
  console.log(body);

  console.log(location, radius);

  if (!location) {
    return res
      .status(400)
      .json({ status: status.ERROR, error: "Location is not provided" });
  }
  if (!radius) {
    return res
      .status(400)
      .json({ status: status.ERROR, error: "Radius is not provided" });
  }

  Parking.getParkingByLocation(location, radius)
    .then(results =>
      res.status(200).json({ status: status.SUCCESS, data: results })
    )
    .catch(err => res.status(400).json({ status: status.ERROR, error: err }));
});

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ status: status.ERROR, error: "Parking Id not provided" });
  }

  Parking.deleteParking(id)
    .then(data =>
      res
        .status(200)
        .json({ status: status.SUCCESS, data: "Deleted successfully." })
    )
    .catch(err => {
      res.status(400).json({
        status: status.ERROR,
        error: err
      });
    });
});

module.exports = Router;
