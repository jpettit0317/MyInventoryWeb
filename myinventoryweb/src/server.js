"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
var portNumber = 3000;
app.listen(portNumber, function () {
    console.log("Listening on port " + portNumber);
});
