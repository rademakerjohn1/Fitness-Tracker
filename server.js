var express = require('express');
const logger = require("morgan");
var app = express();

var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGODB_URI,options)

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var apiRoutes = require("./routes/api-routes.js");
var htmlRoutes = require("./routes/html-routes.js");

app.use('/api', apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });