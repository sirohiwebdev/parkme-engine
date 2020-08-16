const express = require("express");
const Router = express.Router();
const status = require("../config/constants");
const User = require("../models/user");
const createHash = require("../lib/hashing").createHash;
const { successHandler, errorHandler } = require("../lib/responseHandler");
const HTTP_STATUS = require("http-status-codes");
const mongoose = require("mongoose");

Router.get("/:id?", (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id provided");
    return;
  }

  if (id) {
    User.getUser({ _id: id })
      .then(user => {
        const { password, ...userData } = user;
        successHandler(res, HTTP_STATUS.OK, userData);
      })
      .catch(err => {
        errorHandler(res, HTTP_STATUS.NOT_FOUND, err);
      });
  } else {
    User.getUser()
      .then(user => {
        const userData = user.map(u => {
          const { password, ...userDataWithoutPassword } = u;
          return userDataWithoutPassword;
        });
        successHandler(res, HTTP_STATUS.OK, userData);
      })
      .catch(err => {
        errorHandler(res, HTTP_STATUS.NOT_FOUND, err);
      });
  }
});

Router.put("/:id?", (req, res) => {
  const id = req.params.id;
  if (!id) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Id not provided");
    return;
  }
  if (!mongoose.isValidObjectId(id)) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id provided");
    return;
  }

  let userdata = req.body;
  if (userdata.password) {
    userdata.password = createHash(userdata.password);
  }

  User.updateUser(id, userdata)
    .then(user => {
      successHandler(res, HTTP_STATUS.OK, {
        message: "User updated successfully"
      });
    })
    .catch(err => {
      errorHandler(res, HTTP_STATUS.NOT_FOUND, err);
    });
});

Router.delete("/:id?", (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Id not provided");
    return;
  }

  if (!mongoose.isValidObjectId(id)) {
    errorHandler(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id provided");
    return;
  }

  User.deleteUser(id)
    .then(user => {
      successHandler(res, HTTP_STATUS.OK, "User deleted");
    })
    .catch(err => {
      errorHandler(res, HTTP_STATUS.NOT_FOUND, err);
    });
});

module.exports = Router;
