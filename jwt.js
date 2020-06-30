const jwt = require("jsonwebtoken");
const status = require("./config/constants");

const secret =
  "lp098ujnbr567ujmli765rfvcxsw45thnmlpoiuygfcxaq13edfvbhytredfvbnmkiuytrewerf";

const createJWTAuth = doc => jwt.sign({ sub: doc._id }, secret);

const verifyJWTAuth = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(400).json({
      status: status.ERROR,
      error: "Authorization Header not present"
    });
  }
  const token = header.slice(6).trim();

  try {
    const verified = jwt.verify(token, secret);
    next();
    // console.log(verified);
  } catch (e) {
    res
      .status(400)
      .json({ status: status.ERROR, error: "Invalid Authorization Token" });
  }
};
module.exports = {
  createJWTAuth,
  verifyJWTAuth
};
// userid, name, mobile, etc,
