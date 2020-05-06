var express = require("express");
// var path = require('path');
var serveStatic = require("serve-static");
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 3000;
var host = "0.0.0.0";
console.log(app.listen(port, host));
