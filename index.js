const express = require("express");
require("dotenv").config();
const app = express();
const status = require("./config/constants");
const userRoute = require("./routes/users");
const parkingRoute = require("./routes/parking");
const slotsRoute = require("./routes/slots");
const authRoute = require("./routes/auth");
const registerRoute = require("./routes/register");
const routeHandler = require("./routeHandler");
const verifyJWTAuth = require("./jwt").verifyJWTAuth;
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: status.SUCCESS });
});

app.use("/auth", authRoute);

app.use("/register", registerRoute);

app.use("/api", verifyJWTAuth);
app.use("/api/users", userRoute);
app.use("/api/parkings", parkingRoute);
app.use("/api/slots", slotsRoute);
app.use(routeHandler);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
