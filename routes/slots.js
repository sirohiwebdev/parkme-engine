const express = require("express");
const Router = express.Router();
const Slot = require("../models/slot");
const createHash = require("../lib/hashing").createHash;
const { successHandler, errorHandler } = require("../lib/responseHandler");
const HTTP_STATUS = require("http-status-codes");
const mongoose = require("mongoose");

Router.post("/", (req, res, next) => {
  const { timing, car, parking_id, user_id, lot } = req.body;
  const { from, to } = timing || {};
  if (!user_id) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No user Id provided.");
  }
  if (!parking_id) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No Parking Id provided.");
  }
  if (!lot) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No  lot details provided.");
  }
  if (!from) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No  start time provided.");
  }
  if (!to) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No end time provided.");
  }
  if (!car) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "No car details provided.");
  }

  Slot.createSlot(req.body)
    .then(slot => {
      successHandler(res, HTTP_STATUS.CREATED, { data: slot });
    })
    .catch(err => {
      errorHandler(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Unable to create slot"
      );
    });
});

Router.get("/:id?", (req, res, nex) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id provided");
    return;
  }

  if (id) {
    Slot.getSlot(id)
      .then(slot => {
        successHandler(res, HTTP_STATUS.OK, { data: slot });
      })
      .catch(err => {
        errorHandler(res, HTTP_STATUS.NOT_FOUND, "Details not found");
      });
  } else {
    Slot.getSlot()
      .then(slot => {
        successHandler(res, HTTP_STATUS.OK, { data: slot });
      })
      .catch(err => {
        errorHandler(res, HTTP_STATUS.NOT_FOUND, "Details not found");
      });
  }
});

module.exports = Router;
