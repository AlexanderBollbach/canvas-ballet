var express = require("express");
var app = express();

var morgan = require("morgan");

app.use(morgan("tiny"));

app.use(express.static(__dirname + "/dist"));

app.listen(process.env.PORT || 8081);
