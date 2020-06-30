const status = require("./config/constants");

const routeHandler = (req, res, next) => {
  res.status(404).json({ status: status.ERROR, error: "URL not found" });
};

module.exports = routeHandler;
