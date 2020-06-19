var express = require('express');
var mongoose = require('mongoose');
const logger = require("morgan");
var app = express();

var port = process.env.PORT || 8080;


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost/workout";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGODB_URI,options)

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(port, () => {
    console.log(`App running on port ${PORT}!`);
  });