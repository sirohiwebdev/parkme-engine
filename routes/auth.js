const express = require("express");

const Router = express.Router();

Router.post("/", (req, res, next) => {
  console.log(req.body);
  const { mobile, password } = req.body;

  res.json({ STATUS: "SUCCESS", data: mobile });
});

module.exports = Router;
