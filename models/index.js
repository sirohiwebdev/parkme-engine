const mongoose = require("mongoose");
const url =
  "mongodb+srv://parkmeuser:eOly0wSVCOfco4H8@parkme-m9jt9.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
