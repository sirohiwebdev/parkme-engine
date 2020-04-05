const express = require("express");
const Router = express.Router();
const status = require("../config/constants");
const User = require("../models/user");

Router.get("/", (req, res) => {
  const mobile = req.body.mobile;
  User.getUser(mobile)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.ERROR, error: err });
    });
});

Router.post("/", (req, res) => {
  const user = req.body;
  User.createUser(user)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.SUCCESS, error: err });
    });
});

module.exports = Router;
