const HTTP_STATUS = require("http-status-codes");

const successHandler = (res, statusCode = HTTP_STATUS.OK, data) => {
  res.status(statusCode).json(data);
};

const errorHandler = (
  res,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errorMessage = "Something went wrong, try again later"
) => {
  res.status(statusCode).json({ errorMessage: errorMessage });
};
module.exports = {
  successHandler,
  errorHandler
};
