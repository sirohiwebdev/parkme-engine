const express = require("express");
const Router = express.Router();
const status = require("../config/constants");
const User = require("../models/user");
const createHash = require("../lib/hashing").createHash;

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

Router.put("/", (req, res) => {
  const { id } = req.body;
  User.updateUser(id, req.body)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.SUCCESS, error: err });
    });
});

Router.delete("/", (req, res) => {
  const { id } = req.body;
  User.deleteUser(id)
    .then(user => {
      res.json({ status: status.SUCCESS, data: user });
    })
    .catch(err => {
      res.json({ status: status.SUCCESS, error: err });
    });
});

module.exports = Router;
